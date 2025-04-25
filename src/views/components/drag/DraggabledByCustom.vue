<template>
  <div>
    <div class="container">
      <div class="draggable" id="draggable1">拖拽我</div>
      <div class="draggable" id="draggable2" style="top: 150px; left: 150px; background-color: #e74c3c;">拖拽我</div>
    </div>
  </div>
</template>

<script setup lang="ts" name='DraggabledByCustom'>
document.addEventListener('DOMContentLoaded', () => {
  const draggables = document.querySelectorAll('.draggable');
  draggables.forEach(draggable => {
    // 初始位置
    let offsetX, offsetY;
    let isDragging = false;

    // 鼠标按下事件处理
    function handleStart(e) {
       // 触摸事件（touchstart或touchmove），它会特别地获取第一个触摸点（例如touch[0]）
      const event = e.type === 'touchstart' ? e.touches[0] : e;
      // 计算鼠标在元素内的偏移量
      /**
       * Element.getBoundingClientRect() 方法返回一个 DOMRect 对象，
       * 其提供了元素的大小及其相对于视口的位置。
       * 一个 DOMRect 代表一个矩形。
       * 在电脑图形学里面，视口代表了一个可看见的多边形区域（通常来说是矩形）。
       * 在浏览器范畴里，它代表的是浏览器中网站可见内容的部分。视口外的内容在被滚动进来前都是不可见的。
       * 视口当前可见的部分叫做可视视口。可视视口可能会比布局视口更小，
       * 因为当用户缩小浏览器缩放比例时，布局视口不变，而可视视口变小了。
       * rect.bottom：从视口的上边缘到元素的下边缘的距离。
       */
      const rect = draggable.getBoundingClientRect();
      // rect.left：视口左边缘到可拖动元素左边缘的距离。
      // event.clientX：鼠标指针（或触摸点）相对于视口左边缘的水平坐标（x轴）。它是从可见浏览器窗口的左边缘到鼠标光标水平位置的距离。
      // console.log(event.clientX);
      offsetX = event.clientX - rect.left;
      // rect.top：从视窗的上边缘到可拖动元素的上边缘的距离。
      // event.clientY: 鼠标指针（或触摸点）相对于视口上边缘的垂直坐标（y轴）。它是从可见浏览器窗口的上边缘到鼠标光标垂直位置的距离。
      console.log(event.clientY);
      offsetY = event.clientY - rect.top;
      isDragging = true;
      draggable.classList.add('dragging');
      // 添加移动和结束事件监听
      if (e.type === 'mousedown') {
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
      }
    }

    // 移动事件处理
    function handleMove(e) {
      if (!isDragging) return;
      const event = e.type === 'touchmove' ? e.touches[0] : e;
      // 计算新的位置
      const container = document.querySelector('.container');
      const containerRect = container.getBoundingClientRect();
      let left = event.clientX - containerRect.left - offsetX;
      let top = event.clientY - containerRect.top - offsetY;

      // 边界检查
      const maxLeft = containerRect.width - draggable.offsetWidth;
      const maxTop = containerRect.height - draggable.offsetHeight;

      left = Math.max(0, Math.min(left, maxLeft));
      top = Math.max(0, Math.min(top, maxTop));

      // 更新元素的位置
      draggable.style.left = `${left}px`;
      draggable.style.top = `${top}px`;
    }


    // 结束拖拽事件处理
    function handleEnd() {
      if (!isDragging) return;
      isDragging = false;
      draggable.classList.remove('dragging');
      // 移除事件监听
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    }

    // 添加鼠标按下事件监听
    draggable.addEventListener('mousedown', handleStart);
    draggable.addEventListener('touchstart', e => {
      handleStart(e);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }
    )
  })
})


</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 400px;
  border: 2px dashed #ccc;
  position: relative;
  overflow: hidden;

  .draggable {
    width: 100px;
    height: 100px;
    background-color: #3498db;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    cursor: move;
    user-select: none;
    touch-action: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .dragging {
    opacity: 0.8;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }
}
</style>