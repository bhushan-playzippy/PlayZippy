import { useQuery, useMutation } from '@tanstack/react-query';

// Fake API (replace later)
const fetchProfile = async () => {
  await new Promise(res => setTimeout(res, 1000));

  // ⬇️ CASE 1: No profile yet (FIRST TIME USER)
  // return null;

  // ⬇️ CASE 2: Profile already exists
  return {
    name: 'Riya Sharma',
    email: 'riyasharma@gmail.com',
    mobile: '99999 88888',
    relation: 'Mom',
  };
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
};
