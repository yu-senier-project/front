import React from "react";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import {
  getMemberData,
  getMemberResume,
  patchMemberData,
  deleteResume,
  postResume,
  postProfileImage,
  deleteProfileImage,
  getMemberLikeFeed,
  getMemberFeed,
} from "../apis/profileApis";

// 회원 정보 받아 오기
export const useMemberData = (memberId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["memberData", memberId],
    queryFn: () => getMemberData(memberId),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, isError };
};
// 회원 이력서 가져오기
export const useGetResume = (memberId) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["memberResume", memberId],
    queryFn: () => getMemberResume(memberId),
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, isError };
};

// 이력서 삭제
export const useDeleteResume = (memberId) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteResume,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["memberResume", memberId]);
    },
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(["memberResume", memberId]);
      const newData = {
        ...prevData.data,
        uploadFileURL: null,
      };

      queryClient.setQueryData(["memberResume", memberId], { data: newData });
    },
  });

  return mutate;
};

// 회원 이력서 등록
export const usePostResume = (memberId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: postResume,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["memberResume", memberId]);
    },
    // onMutate: (data) => {
    //   console.log(data);
    //   const prevData = queryClient.getQueryData(["memberResume", memberId]);
    //   for (let key of prevData.keys()) {
    //     console.log(key, ":", prevData.get(key));
    //   }

    //   // queryClient.setQueryData(["memberResume", memberId], { data: newData });
    // },
  });

  return { mutate, status };
};

// 회원 프로필 사진 변경
export const usePostProfileImage = (memberId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: postProfileImage,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (e) => {
      console.log(e);
      queryClient.invalidateQueries(["memberData", memberId]);
    },
  });

  return { mutate, status };
};

// 회원 프로필 사진 삭제
export const useDeleteProfileImage = (memberId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: deleteProfileImage,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (e) => {
      console.log(e);
      queryClient.invalidateQueries(["memberData", memberId]);
    },
    onMutate: (data) => {
      console.log(data);
    },
  });

  return { mutate, status };
};

// 회원 게시물 가져오기
export const useGetMemberFeed = (memberId, filterType, startDate, endDate) => {
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["MemberFeeds", memberId, filterType, startDate, endDate],
    queryFn: ({ pageParam = 0 }) => {
      return getMemberFeed(memberId, filterType, startDate, endDate, pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage);
      return lastPage && lastPage.data.length > 0
        ? lastPage.data[lastPage.data.length - 1].id
        : false;
    },
    staleTime: 1000 * 60 * 5,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

// 회원 좋아요한 게시물 가져오기
export const useGetLikeFeed = (memberId) => {
  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["likeFeed", memberId],
    queryFn: ({ pageParam = 0 }) => getMemberLikeFeed(memberId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.data.length > 0) {
        return lastPage.data[lastPage.data.length - 1].id;
      } else {
        return false;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage };
};

// 회원 정보 변경 함수
export const useMemberDataUpdate = (memberId) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: patchMemberData,
    onError: (e) => {
      console.log(e);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["memberData", memberId]);
    },
    onMutate: (newData) => {
      const prevData = queryClient.getQueryData(["memberData", memberId]);
      console.log(prevData);

      const data = {
        birth: prevData.data.birth,
        companyName: prevData.data.companyName,
        id: prevData.data.id,
        introduction: newData.introduction,
        nickname: prevData.data.nickname,
        position: prevData.data.position,
        profile: prevData.data.profile,
      };

      queryClient.setQueryData(["memberData", memberId], { data: data });
    },
  });

  return { mutate, status };
};
