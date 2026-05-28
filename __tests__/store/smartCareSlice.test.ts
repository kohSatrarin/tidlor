/**
 * @jest-environment node
 */
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/app/store/rootReducer';
import {
  addRequest,
  searchRequestById,
  clearSearch,
  seedRequests,
  selectAllRequests,
  selectRequestById,
  selectLastSearchResultId,
  selectLastSearchError,
} from '@/features/smartCare/store/smartCareSlice';
import type { SmartCare } from '@/features/smartCare/types';

jest.mock('uuid', () => ({ v4: jest.fn(() => 'test-uuid-1') }));
jest.mock('react-native-get-random-values', () => ({}));

const { v4: uuidv4 } = jest.requireMock('uuid') as { v4: jest.Mock };

function makeStore() {
  return configureStore({ reducer: rootReducer });
}

const sampleItems: SmartCare[] = [
  { id: 'seed-1', title: 'Title 1', description: 'Desc 1', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'seed-2', title: 'Title 2', description: 'Desc 2', createdAt: '2026-01-02T00:00:00.000Z' },
];

describe('smartCareSlice', () => {
  beforeEach(() => {
    uuidv4.mockReturnValue('test-uuid-1');
  });

  describe('initial state', () => {
    it('items is []', () => {
      const store = makeStore();
      expect(store.getState().smartCare.items).toEqual([]);
    });

    it('lastSearchResultId is null', () => {
      const store = makeStore();
      expect(store.getState().smartCare.lastSearchResultId).toBeNull();
    });

    it('lastSearchError is null', () => {
      const store = makeStore();
      expect(store.getState().smartCare.lastSearchError).toBeNull();
    });
  });

  describe('addRequest', () => {
    it('adds an item with title, description, uuid id, and ISO createdAt', () => {
      const store = makeStore();
      store.dispatch(addRequest({ title: 'Fix AC', description: 'AC is broken' }));
      const items = store.getState().smartCare.items;
      expect(items).toHaveLength(1);
      const item = items[0]!;
      expect(item.title).toBe('Fix AC');
      expect(item.description).toBe('AC is broken');
      expect(item.id).toBe('test-uuid-1');
      expect(item.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it('new item is prepended (first in list)', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      store.dispatch(addRequest({ title: 'New Request', description: 'Newest' }));
      const items = store.getState().smartCare.items;
      expect(items[0]!.title).toBe('New Request');
    });

    it('multiple adds keeps them in newest-first order', () => {
      const store = makeStore();
      uuidv4.mockReturnValueOnce('uuid-a').mockReturnValueOnce('uuid-b').mockReturnValueOnce('uuid-c');
      store.dispatch(addRequest({ title: 'First', description: 'D1' }));
      store.dispatch(addRequest({ title: 'Second', description: 'D2' }));
      store.dispatch(addRequest({ title: 'Third', description: 'D3' }));
      const items = store.getState().smartCare.items;
      expect(items[0]!.title).toBe('Third');
      expect(items[1]!.title).toBe('Second');
      expect(items[2]!.title).toBe('First');
    });

    it('each item gets a unique id', () => {
      const store = makeStore();
      uuidv4.mockReturnValueOnce('uuid-x').mockReturnValueOnce('uuid-y');
      store.dispatch(addRequest({ title: 'Item 1', description: 'D1' }));
      store.dispatch(addRequest({ title: 'Item 2', description: 'D2' }));
      const items = store.getState().smartCare.items;
      expect(items[0]!.id).not.toBe(items[1]!.id);
    });
  });

  describe('searchRequestById — found', () => {
    it('sets lastSearchResultId to the item id', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      store.dispatch(searchRequestById({ id: 'seed-1' }));
      expect(store.getState().smartCare.lastSearchResultId).toBe('seed-1');
    });

    it('sets lastSearchError to null', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      store.dispatch(searchRequestById({ id: 'seed-1' }));
      expect(store.getState().smartCare.lastSearchError).toBeNull();
    });
  });

  describe('searchRequestById — not found', () => {
    it('sets lastSearchResultId to null', () => {
      const store = makeStore();
      store.dispatch(searchRequestById({ id: 'does-not-exist' }));
      expect(store.getState().smartCare.lastSearchResultId).toBeNull();
    });

    it('sets lastSearchError to a non-empty string', () => {
      const store = makeStore();
      store.dispatch(searchRequestById({ id: 'does-not-exist' }));
      const error = store.getState().smartCare.lastSearchError;
      expect(typeof error).toBe('string');
      expect((error as string).length).toBeGreaterThan(0);
    });
  });

  describe('clearSearch', () => {
    it('resets lastSearchResultId to null', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      store.dispatch(searchRequestById({ id: 'seed-1' }));
      store.dispatch(clearSearch());
      expect(store.getState().smartCare.lastSearchResultId).toBeNull();
    });

    it('resets lastSearchError to null', () => {
      const store = makeStore();
      store.dispatch(searchRequestById({ id: 'nonexistent' }));
      store.dispatch(clearSearch());
      expect(store.getState().smartCare.lastSearchError).toBeNull();
    });
  });

  describe('seedRequests', () => {
    it('seeds items when state is empty', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      expect(store.getState().smartCare.items).toEqual(sampleItems);
    });

    it('does NOT overwrite when items already exist', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      const newItems: SmartCare[] = [
        { id: 'new-1', title: 'New', description: 'Should not appear', createdAt: '2026-01-03T00:00:00.000Z' },
      ];
      store.dispatch(seedRequests(newItems));
      expect(store.getState().smartCare.items).toEqual(sampleItems);
    });
  });

  describe('selectors', () => {
    it('selectAllRequests returns items', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      expect(selectAllRequests(store.getState())).toEqual(sampleItems);
    });

    it('selectRequestById returns correct item', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      const item = selectRequestById('seed-2')(store.getState());
      expect(item).toEqual(sampleItems[1]);
    });

    it('selectRequestById returns undefined for missing id', () => {
      const store = makeStore();
      store.dispatch(seedRequests(sampleItems));
      const item = selectRequestById('nope')(store.getState());
      expect(item).toBeUndefined();
    });

    it('selectLastSearchResultId returns id or null', () => {
      const store = makeStore();
      expect(selectLastSearchResultId(store.getState())).toBeNull();
      store.dispatch(seedRequests(sampleItems));
      store.dispatch(searchRequestById({ id: 'seed-1' }));
      expect(selectLastSearchResultId(store.getState())).toBe('seed-1');
    });

    it('selectLastSearchError returns error string or null', () => {
      const store = makeStore();
      expect(selectLastSearchError(store.getState())).toBeNull();
      store.dispatch(searchRequestById({ id: 'missing' }));
      const error = selectLastSearchError(store.getState());
      expect(typeof error).toBe('string');
      expect((error as string).length).toBeGreaterThan(0);
    });
  });
});
