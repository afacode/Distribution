import { getUserInfo } from '@/api/login';
const userInfo = {
  state: {
    data: {},
  },

  mutations: {
    SELECT_USRINFO: (state, data) => {
      state.data = data;
    },

  },

  actions: {
    // 获取
    GetUserInfo({ commit },params) {
      return new Promise((resolve, reject) => {
        getUserInfo(params)
      .then(response=>{
        
        commit("SELECT_USRINFO",response.data.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
    });
    },

  }
};

export default userInfo;
