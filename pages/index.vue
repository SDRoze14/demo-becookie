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
      document.cookie = `dummy1=1234567890 expires=${expiry}`
    }, 2000)
    
  }
}
</script>