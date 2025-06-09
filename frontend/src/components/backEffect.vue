<template>
  <div id="back-effect">
    <div id="firstBox"></div>
    <div id="secondBox"></div>
    <div id="thirdBox"></div>
  </div>
</template>


<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg) translate(75px, 0);
  }
  50% {
    transform: rotate(240deg) translate(75px, 0);
  }
  100% {
    transform: rotate(480deg) translate(75px, 0);
  }
}

@keyframes spinAnti {
  0% {
    transform: rotate(0deg) translate(-75px, 0);
  }
  50% {
    transform: rotate(240deg) translate(-75px, 0);
  }
  100% {
    transform: rotate(480deg) translate(-75px, 0);
  }
}

#back-effect {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  filter: blur(90px);
}

#firstBox,
#secondBox,
#thirdBox {
  position: absolute;
  width: 600px;
  height: 600px;
}

#firstBox {
  background-color: rgba(15, 15, 15, 0.9);
  top: 0;
  right: 0;
  animation: spin 20s linear infinite;
  margin-right: -450px;
  margin-top: -300px;
}

#secondBox {
  background-color: rgba(30, 40, 50, 0.85);
  top: 0;
  left: 0;
  margin-left: -450px;
  margin-top: -300px;
  animation: spin 20s linear infinite;
}

#thirdBox {
  background-color: rgba(80, 80, 80, 0.75);
  bottom: 0;
  right: 0;
  margin-right: -450px;
  margin-bottom: -300px;
  animation: spinAnti 20s linear infinite;
}
</style>
