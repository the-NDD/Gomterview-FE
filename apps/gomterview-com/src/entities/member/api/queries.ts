import {
  DefaultError,
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

import { MemberNicknameResponseDto, MemberResponseDto } from '@gomterview/api';
import { memberApi } from '../api';

export const MEMBER_QUERY_KEY = {
  GET_MEMBER: () => ['member'],
  GET_MEMBER_NAME: () => ['member', 'name'],
};

const queries = {
  getMember: () => ({
    queryKey: MEMBER_QUERY_KEY.GET_MEMBER(),
    queryFn: () => memberApi.getMember(),
  }),
  getMemberName: () => ({
    queryKey: MEMBER_QUERY_KEY.GET_MEMBER_NAME(),
    queryFn: () => memberApi.getMemberName(),
  }),
};

// ---------------------- Query ------------------------------
/**
 * @tags member
 * @summary 회원 정보를 반환하는 메서드
 * @request GET:/api/member
 * @secure*/
export const useGetMemberQuery = <TData = MemberResponseDto,>(
  options?: Omit<
    UseQueryOptions<MemberResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getMember(),
    ...options,
  });
};
/**
 * @tags member
 * @summary 면접 화면에 표출할 이름을 반환하는 메서드
 * @request GET:/api/member/name*/
export const useGetMemberNameQuery = <TData = MemberNicknameResponseDto,>(
  options?: Omit<
    UseQueryOptions<MemberNicknameResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getMemberName(),
    ...options,
  });
};

// ------------------ Suspense Query --------------------------
/**
 * @tags member
 * @summary 회원 정보를 반환하는 메서드
 * @request GET:/api/member
 * @secure*/
export const useSuspenseGetMemberQuery = <TData = MemberResponseDto,>(
  options?: Omit<
    UseSuspenseQueryOptions<MemberResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getMember(),
    ...options,
  });
};
/**
 * @tags member
 * @summary 면접 화면에 표출할 이름을 반환하는 메서드
 * @request GET:/api/member/name*/
export const useSuspenseGetMemberNameQuery = <
  TData = MemberNicknameResponseDto,
>(
  options?: Omit<
    UseSuspenseQueryOptions<MemberNicknameResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    ...queries.getMemberName(),
    ...options,
  });
};
