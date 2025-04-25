<template>
  <div>
    <div class="container">
      <div class="draggable" ref="draggable1Ref">拖拽我</div>
      <div class="draggable" ref="draggable2Ref" style="top: 150px; left: 150px; background-color: #e74c3c;">拖拽我</div>
    </div>
  </div>
</template>

<script setup lang="ts" name='DraggabledByCustom'>
import { onMounted, ref } from 'vue';

// 使用 ref 来获取 DOM 元素引用 (可选，但推荐)
const draggable1Ref = ref<HTMLElement | null>(null);
const draggable2Ref = ref<HTMLElement | null>(null);

onMounted(() => {
  // 可以直接使用 ref 获取元素，或继续使用 querySelectorAll
  // const draggables = document.querySelectorAll('.draggable');
  // 使用 ref 获取的元素数组
  const draggables = [draggable1Ref.value, draggable2Ref.value].filter(el => el) as HTMLElement[];

  draggables.forEach(draggable => {
    // 初始位置
    let offsetX: number, offsetY: number;
    let isDragging = false;

    // 鼠标按下事件处理
    function handleStart(e: MouseEvent | TouchEvent) {
       // 触摸事件（touchstart或touchmove），它会特别地获取第一个触摸点（例如touch[0]）
      const event = e.type === 'touchstart' ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      // 计算鼠标在元素内的偏移量
      const rect = draggable.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top; // << --- 你之前的代码好像漏了计算 offsetY
      isDragging = true;
      draggable.classList.add('dragging'); // 添加拖动状态样式

      // 添加移动和结束事件监听
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false }); // passive: false 防止触摸滚动
      document.addEventListener('touchend', handleEnd);
    }

    // 鼠标移动事件处理
    function handleMove(e: MouseEvent | TouchEvent) {
      if (!isDragging) return;
       // 阻止默认行为，尤其是在触摸事件中防止页面滚动
       if (e.type === 'touchmove') {
         e.preventDefault();
       }
      const event = e.type === 'touchmove' ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      // 计算新的位置
      const container = draggable.parentElement as HTMLElement; // 获取父容器
      const containerRect = container.getBoundingClientRect();

      let newX = event.clientX - offsetX - containerRect.left; // 相对于父容器的 X
      let newY = event.clientY - offsetY - containerRect.top;  // 相对于父容器的 Y

       // 边界检测 (防止拖出容器)
       newX = Math.max(0, Math.min(newX, containerRect.width - draggable.offsetWidth));
       newY = Math.max(0, Math.min(newY, containerRect.height - draggable.offsetHeight));


      // 更新元素位置
      draggable.style.left = `${newX}px`;
      draggable.style.top = `${newY}px`;
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
    draggable.addEventListener('touchstart', handleStart, { passive: true }); // touchstart 可以是 passive

  });
});

</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 400px;
  border: 2px dashed #ccc;
  position: relative; /* 确保子元素的 absolute 定位是相对于此容器 */
  overflow: hidden; /* 防止拖拽元素溢出 */
  margin-top: 20px; /* 添加一些边距避免紧贴顶部 */
}

.draggable {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  position: absolute; /* 使用绝对定位 */
  user-select: none; /* 防止拖拽时选中文本 */
  touch-action: none; /* 优化触摸体验，禁用浏览器默认的触摸行为（如滚动） */
}

.draggable.dragging {
  cursor: grabbing;
  opacity: 0.7;
  z-index: 1000; /* 确保拖拽时在最上层 */
}
</style>
