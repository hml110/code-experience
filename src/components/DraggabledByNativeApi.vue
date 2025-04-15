<template>
  <div>
    <div ref="draggable" id="draggable" draggable="true">拖动我</div>
    <div ref="dropzone" id="dropzone">放置区域</div>
  </div>
</template>

<script setup lang="ts" name='DraggabledByNativeApi'>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';

const draggable = ref<HTMLDivElement | null>(null);
const dropzone = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const draggableEl = draggable.value;
  const dropzoneEl = dropzone.value;

  if (draggableEl && dropzoneEl) {
    // Drag source events
    draggableEl.addEventListener('dragstart', (e: DragEvent) => {
      if (e.dataTransfer && e.target instanceof HTMLElement) {
        console.log('源对象开始被拖动时触发:');
        // 设置拖动数据
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
      }
    });

    
    dropzoneEl.addEventListener('drag', (e: DragEvent) => {
      // 阻止默认行为以允许放置
      e.preventDefault();
      console.log('源对象被拖动过程中反复触发:');
      message.warning('源对象被拖动过程中反复触发:');
    });

    // Drop zone events
    dropzoneEl.addEventListener('dragenter', (e: DragEvent) => {
      console.log('源对象开始进入目标对象范围内触发:');
      e.preventDefault();
      dropzoneEl.classList.add('drop-active');
    });

    dropzoneEl.addEventListener('dragover', (e: DragEvent) => {
      console.log('源对象在目标对象范围内移动时触发:');
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
    });

    dropzoneEl.addEventListener('dragleave', (e: DragEvent) => {
      console.log('源对象离开目标对象范围时触发:');
      dropzoneEl.classList.remove('drop-active');
    });

    dropzoneEl.addEventListener('drop', (e: DragEvent) => {
      console.log('源对象在目标对象范围内被释放时触发:');
      e.preventDefault();
      dropzoneEl.classList.remove('drop-active');
      if (e.dataTransfer) {
        
        const data = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(data);
        if (draggedElement) {
           // Append the dragged element to the dropzone
           dropzoneEl.appendChild(draggedElement); // Uncommented this line
           // Optional: Adjust styling after drop if needed
           draggedElement.style.margin = '0'; // Remove margin if it causes issues
           console.log(`Element ${data} dropped onto dropzone`);
        }
      }
    });

    dropzoneEl.addEventListener('dragend', (e: DragEvent) => {
      // 阻止默认行为以允许放置
      // e.preventDefault();
      message.info('源对象拖动结束时触发:');
    });

  } else {
    console.error('Draggable or Dropzone element not found');
  }
});
</script>

<style scoped>
#draggable {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  border: 1px solid black;
  margin-bottom: 10px;
  text-align: center;
  line-height: 100px;
  cursor: move;
  /* Ensure it stays within its parent if needed */
  position: relative; 
}

#dropzone {
  width: 200px;
  height: 200px;
  border: 2px dashed grey;
  text-align: center;
  line-height: 200px;
  /* Prevent content from shifting layout drastically */
  display: flex; 
  align-items: center;
  justify-content: center;
}

.drop-active {
  border-color: green;
  background-color: lightgreen;
}

/* Optional: Style for the element when inside dropzone */
#dropzone > #draggable {
  margin: 0;
  width: 80px; /* Example smaller size */
  height: 80px;
  line-height: 80px;
}
</style>