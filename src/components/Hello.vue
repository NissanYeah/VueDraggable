<template>
  <div class="fluid container">
    <div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Sortable control</h3>
      </div>
    </div>

    <div class="col-md-3" v-for="(arr, index) in test" :key="index">
      <draggable
        class="list-group"
        tag="ul"
        v-model="test[index]"
        v-bind="dragOptions"
        @end="onUpdate"
      >
        <li
          class="list-group-item"
          v-for="(element, key) in test[index]"
          :key="key"
        >
          {{ element.name }}
        </li>
      </draggable>
    </div>
    <div class="list-group col-md-3">
      <pre>{{ listString }}</pre>
    </div>
    <div class="list-group col-md-3">
      <pre>{{ list2String }}</pre>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "hello",
  components: {
    draggable
  },
  data() {
    return {
      test: {
        list1: [
          {
            name: "心包炎",
            adjustedOrder: 1,
            adjustedTier: "test1"
          },
          {
            name: "急性冠脉综合征",
            adjustedOrder: 2,
            adjustedTier: "test1"
          }
        ],
        list2: [
          {
            name: "心绞痛",
            adjustedOrder: 1,
            adjustedTier: "test2"
          },
          {
            name: "肺梗死",
            adjustedOrder: 2,
            adjustedTier: "test2"
          }
        ]
      },
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  methods: {
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    onUpdate() {
      // 當完成更新後，就自動重新調整adjustedOrder排序還有adjustedTier的組別
      const state = this;
      Object.keys(state.test).forEach(arr => {
        state.test[arr].forEach((item, index) => {
          item.adjustedOrder = index + 1;
          item.adjustedTier = String(arr);
        });
      });
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.test.list1, null, 2);
    },
    list2String() {
      return JSON.stringify(this.test.list2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
