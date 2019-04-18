
export default {
  install (regist, api) {
    regist('post:getImg', 'oliPets/v1/petsIntroduce/getListByOrder/', {}, {
      withoutCode: true,
      formData: false
    })
  }
}
