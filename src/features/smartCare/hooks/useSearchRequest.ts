import { useAppDispatch, useAppSelector } from '@/features/shared/hooks/useAppDispatch';
import {
  searchRequestById,
  clearSearch,
  selectLastSearchResultId,
  selectLastSearchError,
} from '@/features/smartCare/store/smartCareSlice';

export function useSearchRequest() {
  const dispatch = useAppDispatch();
  const resultId = useAppSelector(selectLastSearchResultId);
  const searchError = useAppSelector(selectLastSearchError);

  const search = (id: string) => {
    dispatch(searchRequestById({ id }));
  };

  const reset = () => {
    dispatch(clearSearch());
  };

  return { search, reset, resultId, searchError };
}
