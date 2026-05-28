import { useAppSelector } from '@/features/shared/hooks/useAppDispatch';
import { selectAllRequests } from '@/features/smartCare/store/smartCareSlice';

export function useRequests() {
  const items = useAppSelector(selectAllRequests);
  return { items };
}
