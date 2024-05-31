// useFindStore.js
import { create } from 'zustand';
import axios from 'axios';

const useFindStore = create((set) => ({
    checkId: '',
    firstName: '',
    secondName: '',
    email: '',
    id: '',
    isChecked: false,
    //주어진 이메일로 ID를 확인하는 함수
    setCheckId: async (email) => {
        try {
            const response = await axios.get(`http://43.203.69.159/api/v1/auth/nickname-inquiry?email=${email}`);
            set({ checkId: response.data.nickname });
            console.log(response.data.nickname);
        } catch (error) {
            console.error('Failed to fetch checkId:', error);
        }
    },

    // 이름, 이메일 인증 모두 완료 했는가 확인하는 함수
    setIsCheck: () =>
        set((state) => ({
            isChecked: !state.isChecked,
        })),

    // 이름을 설정하는 함수
    setFirstName: (firstName) => set({ firstName }),

    //성을 설정하는 함수
    setSecondName: (secondName) => set({ secondName }),

    // 이메일을 설정하는 함수
    setEmail: (email) => set({ email }),

    // ID를 설정하는 함수
    setId: (id) => set({ id }),
}));

export default useFindStore;
