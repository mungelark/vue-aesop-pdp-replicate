<template>
  <svg role="img" viewBox="0 0 50 50">
    <g>
      <circle cx="25" cy="25" r="22" fill="none"></circle>
      <polygon
        class="icon-plus"
        points="26.2,15.2 23.8,15.2 23.8,23.9 15,23.9 15,26.4 23.8,26.4 23.8,35.1 26.2,35.1 26.2,26.4 35,26.4 35,23.9 26.2,23.9"
      ></polygon>
      <polygon
        class="icon-close"
        points="32.9,19 31.2,17.3 25,23.4 18.8,17.2 17,19 23.3,25.2 17.1,31.3 18.8,33 25,26.9 31.2,33.1 33,31.3 26.7,25.1"
      ></polygon>
    </g>
  </svg>
</template>

<style lang="scss" scoped>
circle {
  fill: transparent;
  stroke-width: 3px;
  stroke: #333;
  transition: fill 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.icon-plus {
  opacity: 1;
  stroke-width: 2px;
  transition: fill 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    stroke 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.icon-close {
  opacity: 0;
  stroke-width: 2px;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.icon-plus,
.icon-close {
  fill: #333;
  stroke: #333;
}
</style>