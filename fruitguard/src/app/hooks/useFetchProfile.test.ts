import { renderHook, waitFor } from '@testing-library/react';
import { fetchProfile } from '../utils/fetchProfile';
import useProfile from './useFetchProfile';

jest.mock('../utils/fetchProfile', () => ({ fetchProfile: jest.fn() }));

describe('useProfile hook', () => {
  const mockFetchProfile = fetchProfile as jest.Mock;
  const token = 'token';
  beforeEach(() => {
    mockFetchProfile.mockClear();
  });
  it('fetches and sets profile on successful API call', async () => {
    const mockProfile = { name: 'Alice', email: 'alice@mwanzia.com' };
    mockFetchProfile.mockResolvedValueOnce(mockProfile);
    const { result } = renderHook(() => useProfile(token));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.profile).toEqual(mockProfile);
  });

  it('sets error and stops loading if token is missing', () => {
    const { result } = renderHook(() => useProfile(''));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Token is missing');
    expect(result.current.profile).toBeNull();
  });

  it('Sets an error state when fetchProfile rejects the promise', async () => {
    const errorMessage = 'Failed to fetch profile';
    mockFetchProfile.mockRejectedValueOnce(new Error(errorMessage));
    const { result } = renderHook(() => useProfile(token));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.profile).toBeNull();
  });

});
