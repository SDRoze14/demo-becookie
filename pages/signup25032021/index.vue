<template>
  <div>
    <div class="flex flex-wrap mt-6 mb-4">
      <div class="w-full md:w-1/2 self-center hidden md:block">
        <img src="/images/img-cookie-secue.png" class="translate-x--20" />
      </div>
      <div class="w-full md:w-1/2 md:pl-8 p-6">
        <div class="text-3xl">{{ $t('signup.title') }} Test</div>
        <div
          class="text-sm text-gray-500 font-light pb-2"
          style="white-space: pre-line"
        >
          *{{ $t('signup.subtitle') }}
        </div>
        <div
          class="text-sm text-gray-500 font-light mb-8"
          style="white-space: pre-line"
        >
          {{ $t('signup.subtitle2') }}
        </div>

        <form @submit="loginSubmit">
          <!-- <div class="mb-4">
            <base-input
              :label="$t('signup.labelName')"
              :placeholder="$t('signup.placeholderrName')"
              v-model="name"
            ></base-input>
          </div> -->
          <div class="">
            <base-input
              :label="$t('signup.labelEmail')"
              :placeholder="$t('signup.placeholderrEmail')"
              v-model="email"
              innerClass="lowercase"
            ></base-input>
          </div>
          <div class="mb-4">
            <!-- <div class="text-sm font-light text-gray-600">*{{$t('lang') == 'en' ? `Only ".ac.th", ".co.th", ".or.th" and ".go.th"` : 'เฉพาะ "ac.th", "co.th", "or.th" และ "go.th"'}}</div> -->
            <div
              v-if="errorEmail"
              class="mb-4 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
            >
              {{ errorEmailMessage }}
            </div>
          </div>
          <!-- <div class="mb-4">
            <base-input
              :label="$t('signup.labelPassword')"
              placeholder="*******"
              type="password"
              v-model="password"
            ></base-input>
          </div>
          <div class="mb-4">
            <base-input
              :label="$t('signup.labelConfirmPassword')"
              placeholder="********"
              type="password"
              v-model="confirmPassword"
            ></base-input>
          </div> -->
          <!-- <div class="mb-4">
            <base-input
              :label="$t('signup.labelApplicationName')"
              :placeholder="$t('signup.placeholderrApplicationName')"
              v-model="applicationName"
            ></base-input>
          </div> -->
          <div class="mb-4">
            <base-input
              :label="$t('signup.labelDomain')"
              :placeholder="$t('signup.placeholderrDomain')"
              v-model="domainName"
              innerClass="lowercase"
            ></base-input>
          </div>
          <div class="flex">
            <base-check :label="$t('signup.accept')" v-model="check" />
            <div class="text-blue-500">
              <span
                class="cursor-pointer hover:text-blue-700"
                @click="termClick()"
                >&nbsp;{{ $t('termCondition') }}</span
              >
            </div>
          </div>
          <div class="mb-8"></div>

          <div
            v-if="error"
            class="mb-4 bg-red-100 text-red-500 text-sm px-4 py-2 rounded-md"
          >
            {{ error }}
          </div>
          <div
            v-if="success"
            class="mb-4 bg-green-100 text-green-500 text-sm px-4 py-2 rounded-md"
          >
            {{ success }}
            <!-- <div class="text-center mt-2 mb-1">
              <nuxt-link to="/login" class="text-green-600 py-1 px-4"
                >Login</nuxt-link
              >
            </div> -->
          </div>

          <div class="text-right">
            <base-button
              type="submit"
              :disabled="!check"
              :class="!check ? 'bg-gray-400 border-gray-400' : ''"
              >{{ $t('lang') == 'th' ? 'ลงทะเบียน' : 'Sign up' }}</base-button
            >
          </div>
          <div>
            <base-button @click="openMessageClick">Test</base-button>
          </div>
        </form>
      </div>
    </div>

    <message-register ref="messageRegisterRef"></message-register>
    <!-- <message-comfirm ref="MessageComfirmRef" /> -->
  </div>
</template>

<script>
import MessageRegister from '@/components/user/message-register'
// import MessageComfirm from '@/components/user/message-comfirm'
import sampleData from '@/pages/signed/test.json'
export default {
  layout: 'auth',
  components: { MessageRegister },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      applicationName: '',
      domainName: '',

      error: '',
      success: '',
      check: false,
      errorEmailMessage: '',
      sample: sampleData.sample,
    }
  },
  computed: {
    errorEmail() {
      if (
        this.email.includes('.co.th') ||
        this.email.includes('.ac.th') ||
        this.email.includes('.or.th') ||
        this.email.includes('.go.th') ||
        this.email.includes('thai-g.com') ||
        this.email == ''
      ) {
        this.errorEmailMessage = ''
        return false
      } else {
        this.errorEmailMessage =
          this.$t('lang') == 'en'
            ? `Email invalid or not match to "ac.th", "co.th", "or.th" and "go.th"`
            : 'อีเมลไม่ถูกต้อง หรือ อีเมล์ไม่ตรงกับ "ac.th", "co.th", "or.th" และ "go.th"'
        return true
      }
    },
  },
  mounted() {
    // this.$router.push('/login')
  },
  methods: {
    async loginSubmit(e) {
      e.preventDefault()
      const self = this

      var error = ''

      if (!self.$model.validateEmail(self.email))
        error = self.$t('lang') == 'en' ? 'Invalid your email.' : 'อีเมลไม่ถูกต้อง'
      // else if (!self.name) error = $t('lang') == 'en' ? 'Please enter your name.' : 'กรุณากรอกชื่อของท่าน'
      // else if (!self.password) error = 'Please enter your password.'
      // else if (self.password != self.confirmPassword)
      //   error = 'Password not match.'
      // else if (!self.applicationName)
      //   error = $t('lang') == 'en' ? 'Please enter your application name.' : 'กรุณากรอกชื่อแอปพลิเคชันของท่าน'
      else if (!self.domainName)
        error =
          self.$t('lang') == 'en'
            ? 'Please enter your domain name.'
            : 'กรุณากรอกชื่อโดเมนของท่าน'

      self.error = error
      self.success = ''
      if (error) return

      self.$store.dispatch('loading/setLoading', true)

      await self.$api
        .signupTest({
          name: self.email,
          email: self.email,
          applicationName: self.domainName,
          domainName: self.domainName.toLowerCase(),
          scanFrequency: '30 days',
        })
        .then((response) => {
          var email = self.email
          this.$refs.messageRegisterRef.show(response.data)
          // self.success = self.$t('lang') == 'en' ? 'Please check your email to confirm your registration' : 'กรุณาตรวจสอบอีเมล์ของท่านเพื่อยืนยันการสมัคร'
          self.name = ''
          self.email = ''
          self.password = ''
          self.confirmPassword = ''
          self.applicationName = ''
          self.domainName = ''
          self.$store.dispatch('loading/setLoading', false)
        })
        .catch((error) => {
          var code = error.response.data.code
          if (code == 'InvalidParameterException')
            self.error = 'Password must have length greater than 6'
          else if (code == 'UsernameExistsException')
            self.error =
              self.$t('lang') == 'en'
                ? 'This email has been used already'
                : 'อีเมลนี้ถูกใช้แล้ว'
          else
            self.error =
              self.$t('lang') == 'en'
                ? error.response.data.info
                : 'ชื่อโดเมนไม่ถูกต้อง​ กรุณาติดต่อ​แอดมิน'
          self.$store.dispatch('loading/setLoading', false)
        })
      // const res = await self.$store.dispatch('me/signup', {
      //   name: self.email,
      //   email: self.email,
      //   applicationName: self.domainName,
      //   domainName: self.domainName.toLowerCase(),
      //   scanFrequency: '30 days',
      // })
      // if (res instanceof Error) {
      //   var code = res.response.data.code
      //   if (code == 'InvalidParameterException')
      //     self.error = 'Password must have length greater than 6'
      //   else if (code == 'UsernameExistsException')
      //     self.error = $t('lang') == 'en' ? 'This email has been used already' : 'อีเมลนี้ถูกใช้แล้ว'
      //   else self.error = res.response.data.info

      //   self.$store.dispatch('loading/setLoading', false)
      // } else {
      //   var email = self.email
      //   this.$refs.messageRegister.show(res.data)
      //   // self.success = self.$t('lang') == 'en' ? 'Please check your email to confirm your registration' : 'กรุณาตรวจสอบอีเมล์ของท่านเพื่อยืนยันการสมัคร'
      //   self.name = ''
      //   self.email = ''
      //   self.password = ''
      //   self.confirmPassword = ''
      //   self.applicationName = ''
      //   self.domainName = ''
      //   self.$store.dispatch('loading/setLoading', false)
      // }
      self.$store.dispatch('loading/setLoading', false)
    },
    termClick() {
      // this.$router.push('/terms')
      window.open('/terms', '_blank')
    },
    policyClick() {
      window.open('/policy', '_blank')
      // this.$router.push('/policy')
    },
    openMessageClick() {
      this.$refs.messageRegisterRef.show(this.sample)
    },
  },
}
</script>


