# 說明

- 使用套件 [vue.draggable](https://github.com/SortableJS/Vue.Draggable)
- 原始範例程式碼：https://david-desmaisons.github.io/draggable-example/


# 問題說明

- 在此範例中，可以使用v-model，但在`maltose-frontend`中，無法使用v-model

#Example

```JavaScript
  <div class="col-md-3" v-for="(arr, index) in test" :key="index">
    <draggable
      class="list-group"
      tag="ul"
      v-model="test[index]"  //可以作用
      v-bind="dragOptions"
      @end="onUpdate" >
      <li
        class="list-group-item"
        v-for="(element, key) in test[index]"
        :key="key"
      >
        {{ element.name }}
      </li>
    </draggable>
  </div>
 ```

#Maltose

```JavaScript
  <template slot-scope="scope">
    <div v-for="(element, key) in scope.row.tiers" :key="key">
      <span :key="key">{{ key }}
        <draggable v-model="scope.row.tiers[key]" v-bind="dragOptions">  //無法作用
          <el-tag v-for="(diseases, index) in scope.row.tiers[key]" :key="index"
            closable type="info">
            {{ diseases.name }}
          </el-tag>
        </draggable>
        </span>
    </div>
  </template>
```




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build
```

