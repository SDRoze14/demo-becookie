<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="text-6xl">DEMO beCOOKIES</div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  mounted() {
    let date = new Date('August 19, 2022 23:15:30')
    // console.log(this.$model.getFormatISO(date))
    let expiry = this.$model.getFormatISO(date)
    setTimeout(() => {
      document.cookie = 'dummy2=asdfjkll; expires=2021-12-08T06:51:54.000Z;'
    }, 1000)
    
  }
}
</script>