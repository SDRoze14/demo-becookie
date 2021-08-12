<template>
  <base-modal v-model="isShow">
    <div class="py-3 border-b-2 border-gray-100 text-center">{{$t('lang') == 'en' ? 'Change Password' : 'เปลี่ยนรหัสผ่าน'}}</div>

    <div class="w-full py-3">
      <base-input class="pb-3" type="password" :label="$t('lang') == 'en' ? 'Current Password' : 'รหัสผ่านปัจจุบัน'" v-model="old_password"></base-input>
      <base-input class="pb-3" type="password" :label="$t('lang') == 'en' ? 'New Password' : 'รหัสผ่านใหม่'" v-model="new_password"></base-input>
      <base-input type="password" :label="$t('lang') == 'en' ? 'Confirm New Password' : 'ยืนยันรหัสผ่านใหม่'" v-model="confirm_password"></base-input>
    </div>

    <div v-if="error" class="py-2 px-3 bg-red-50 text-red-600 text-sm mt-3">
      {{error}}
    </div>

    <div class="flex mt-3 justify-center">
      <div class="mx-2">
        <base-button color="gray" @click="isShow = false">{{$t('cancleBtn')}}</base-button>
      </div>
      <div class="mx-2">
        <base-button color="primary" @click="confirmClick">{{$t('lang') == 'en' ? 'Save' : 'บันทึก'}}</base-button>
      </div>
    </div>
  </base-modal>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      user: {},
      old_password: '',
      new_password: '',
      confirm_password: '',
      error: ''
    }
  },
  methods: {
    show(user) {
      this.isShow = true
      this.user = user
    },
    async confirmClick() {
      let self = this;
      let error = ''

      if (!self.old_password) error = self.$t('error.change_pass.empty_oldpass')
      else if (!self.new_password) error = self.$t('error.change_pass.empty_newpass')
      else if (!self.confirm_password) error = self.$t('error.change_pass.empty_confirmpass')
      else if (self.confirm_password != self.new_password) error = self.$t('error.change_pass.not_match')

      self.error = error
      if(error) return

      await self.$store.dispatch('loading/setLoading', true)

      await self.$api.changePassword({
        old_password: self.old_password,
        new_password: self.new_password
      })
        .then(response => {
          self.$toast.open({
            message: self.$t('success.change_pass.change_success'),
            type: 'success',
            duration: 6000,
          })
          self.old_password = ''
          self.new_password = ''
          self.confirm_password = ''
          self.isShow = false
        })
        .catch(err => {
          self.$toast.open({
            message: err.response.data.message ? err.response.data.message : self.$t('error.change_pass.change_error'),
            type: 'error',
            duration: 6000,
          })
          self.isShow = false
        })
      await self.$store.dispatch('loading/setLoading', false)
    }
  }
}
</script>