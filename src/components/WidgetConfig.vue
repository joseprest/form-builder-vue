<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item label="model" v-if="data.type != 'grid'">
        <el-input v-model="data.model"></el-input>
      </el-form-item>
      <el-form-item label="name" v-if="data.type != 'grid'">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item
        label="width"
        v-if="Object.keys(data.options).indexOf('width') >= 0"
      >
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item
        label="height"
        v-if="Object.keys(data.options).indexOf('height') >= 0"
      >
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item
        label="size"
        v-if="Object.keys(data.options).indexOf('size') >= 0"
      >
        Width
        <el-input
          style="width: 90px"
          type="number"
          v-model.number="data.options.size.width"
        ></el-input>
        Height
        <el-input
          style="width: 90px"
          type="number"
          v-model.number="data.options.size.height"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="placeholder"
        v-if="
          Object.keys(data.options).indexOf('placeholder') >= 0 &&
          (data.type != 'time' || data.type != 'date')
        "
      >
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item
        label="layout"
        v-if="Object.keys(data.options).indexOf('inline') >= 0"
      >
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">Block</el-radio-button>
          <el-radio-button :label="true">Inline</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="showInput"
        v-if="Object.keys(data.options).indexOf('showInput') >= 0"
      >
        <el-switch v-model="data.options.showInput"></el-switch>
      </el-form-item>
      <el-form-item
        label="min"
        v-if="Object.keys(data.options).indexOf('min') >= 0"
      >
        <el-input-number
          v-model="data.options.min"
          :min="0"
          :max="100"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        label="max"
        v-if="Object.keys(data.options).indexOf('max') >= 0"
      >
        <el-input-number
          v-model="data.options.max"
          :min="0"
          :max="100"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        label="step"
        v-if="Object.keys(data.options).indexOf('step') >= 0"
      >
        <el-input-number
          v-model="data.options.step"
          :min="0"
          :max="100"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item
        label="multiple"
        v-if="data.type == 'select' || data.type == 'imgupload'"
      >
        <el-switch
          v-model="data.options.multiple"
          @change="handleSelectMuliple"
        ></el-switch>
      </el-form-item>
      <el-form-item label="filterable" v-if="data.type == 'select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item
        label="allowHalf"
        v-if="Object.keys(data.options).indexOf('allowHalf') >= 0"
      >
        <el-switch v-model="data.options.allowHalf"></el-switch>
      </el-form-item>
      <el-form-item
        label="showAlpha"
        v-if="Object.keys(data.options).indexOf('showAlpha') >= 0"
      >
        <el-switch v-model="data.options.showAlpha"></el-switch>
      </el-form-item>
      <el-form-item
        label="showLabel"
        v-if="Object.keys(data.options).indexOf('showLabel') >= 0"
      >
        <el-switch v-model="data.options.showLabel"></el-switch>
      </el-form-item>
      <!-- TODO: table config   START-->
      <!-- TODO: table config   END-->
      <el-form-item
        label="option"
        v-if="Object.keys(data.options).indexOf('options') >= 0"
      >
        <el-radio-group
          v-model="data.options.remote"
          size="mini"
          style="margin-bottom: 10px"
        >
          <el-radio-button :label="false">Static Data</el-radio-button>
          <el-radio-button :label="true">remoteData</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input size="mini" style v-model="data.options.remoteFunc">
              <template slot="prepend">remoteFunc</template>
            </el-input>
            <el-input size="mini" style v-model="data.options.props.value">
              <template slot="prepend">value</template>
            </el-input>
            <el-input size="mini" style v-model="data.options.props.label">
              <template slot="prepend">label</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template
            v-if="
              data.type == 'radio' ||
              (data.type == 'select' && !data.options.multiple)
            "
          >
            <el-radio-group v-model="data.options.defaultValue">
              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{
                  group: { name: 'options' },
                  ghostClass: 'ghost',
                  handle: '.drag-item',
                }"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-radio :label="item.value" style="margin-right: 5px">
                    <el-input
                      :style="{
                        width: data.options.showLabel ? '90px' : '180px',
                      }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      style="width: 90px"
                      size="mini"
                      v-if="data.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i
                    class="drag-item"
                    style="font-size: 16px; margin: 0 5px; cursor: move"
                  >
                    <i class="iconfont icon-icon_bars"></i>
                  </i>
                  <el-button
                    @click="handleOptionsRemove(index)"
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px; margin-left: 5px"
                  ></el-button>
                </li>
              </draggable>
            </el-radio-group>
          </template>

          <template
            v-if="
              data.type == 'checkbox' ||
              (data.type == 'select' && data.options.multiple)
            "
          >
            <el-checkbox-group v-model="data.options.defaultValue">
              <draggable
                tag="ul"
                :list="data.options.options"
                v-bind="{
                  group: { name: 'options' },
                  ghostClass: 'ghost',
                  handle: '.drag-item',
                }"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox :label="item.value" style="margin-right: 5px">
                    <el-input
                      :style="{
                        width: data.options.showLabel ? '90px' : '180px',
                      }"
                      size="mini"
                      v-model="item.value"
                    ></el-input>
                    <el-input
                      style="width: 90px"
                      size="mini"
                      v-if="data.options.showLabel"
                      v-model="item.label"
                    ></el-input>
                  </el-checkbox>
                  <i
                    class="drag-item"
                    style="font-size: 16px; margin: 0 5px; cursor: move"
                  >
                    <i class="iconfont icon-icon_bars"></i>
                  </i>
                  <el-button
                    @click="handleOptionsRemove(index)"
                    circle
                    plain
                    type="danger"
                    size="mini"
                    icon="el-icon-minus"
                    style="padding: 4px; margin-left: 5px"
                  ></el-button>
                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px">
            <el-button type="text" @click="handleAddOption"
              >Add Option</el-button
            >
          </div>
        </template>
      </el-form-item>

      <el-form-item label="remoteData" v-if="data.type == 'cascader'">
        <div>
          <el-input size="mini" style v-model="data.options.remoteFunc">
            <template slot="prepend">remoteFunc</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.props.value">
            <template slot="prepend">value</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.props.label">
            <template slot="prepend">label</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.props.children">
            <template slot="prepend">childrenOption</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item
        label="defaultValue"
        v-if="
          Object.keys(data.options).indexOf('defaultValue') >= 0 &&
          (data.type == 'textarea' ||
            data.type == 'input' ||
            data.type == 'rate' ||
            data.type == 'color' ||
            data.type == 'switch')
        "
      >
        <el-input
          v-if="data.type == 'textarea'"
          type="textarea"
          :rows="5"
          v-model="data.options.defaultValue"
        ></el-input>
        <el-input
          v-if="data.type == 'input'"
          v-model="data.options.defaultValue"
        ></el-input>
        <el-rate
          v-if="data.type == 'rate'"
          style="display: inline-block; vertical-align: middle"
          :max="data.options.max"
          :allow-half="data.options.allowHalf"
          v-model="data.options.defaultValue"
        ></el-rate>
        <el-button
          type="text"
          v-if="data.type == 'rate'"
          style="
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
          "
          @click="data.options.defaultValue = 0"
          >Clear</el-button
        >
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch
          v-if="data.type == 'switch'"
          v-model="data.options.defaultValue"
        ></el-switch>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item label="showType" v-if="data.type == 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="isRange" v-if="data.type == 'time'">
          <el-switch v-model="data.options.isRange"></el-switch>
        </el-form-item>
        <el-form-item label="isTimestamp" v-if="data.type == 'date'">
          <el-switch v-model="data.options.timestamp"></el-switch>
        </el-form-item>
        <el-form-item
          label="placeholder"
          v-if="
            (!data.options.isRange && data.type == 'time') ||
            (data.type != 'time' &&
              data.options.type != 'datetimerange' &&
              data.options.type != 'daterange')
          "
        >
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item
          label="startPlaceholder"
          v-if="
            data.options.isRange ||
            data.options.type == 'datetimerange' ||
            data.options.type == 'daterange'
          "
        >
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item
          label="endPlaceholder"
          v-if="
            data.options.isRange ||
            data.options.type == 'datetimerange' ||
            data.options.type == 'daterange'
          "
        >
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="format">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item
          label="defaultValue"
          v-if="
            data.type == 'time' &&
            Object.keys(data.options).indexOf('isRange') >= 0
          "
        >
          <el-time-picker
            key="1"
            style="width: 100%"
            v-if="!data.options.isRange"
            v-model="data.options.defaultValue"
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          ></el-time-picker>
          <el-time-picker
            key="2"
            v-if="data.options.isRange"
            style="width: 100%"
            v-model="data.options.defaultValue"
            is-range
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          ></el-time-picker>
        </el-form-item>
      </template>

      <template v-if="data.type == 'imgupload'">
        <el-form-item label="limit">
          <el-input
            type="number"
            v-model.number="data.options.length"
          ></el-input>
        </el-form-item>
        <el-form-item label="isQiniu">
          <el-switch v-model="data.options.isQiniu"></el-switch>
        </el-form-item>
        <template v-if="data.options.isQiniu">
          <el-form-item label="Domain" :required="true">
            <el-input v-model="data.options.domain"></el-input>
          </el-form-item>
          <el-form-item label="tokenFunc" :required="true">
            <el-input v-model="data.options.tokenFunc"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="imageAction" :required="true">
            <el-input v-model="data.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <template v-if="data.type == 'blank'">
        <el-form-item label="defaultType">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" label="string"></el-option>
            <el-option value="Object" label="object"></el-option>
            <el-option value="Array" label="array"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item label="gutter">
          <el-input
            type="number"
            v-model.number="data.options.gutter"
          ></el-input>
        </el-form-item>
        <el-form-item label="columnOption">
          <draggable
            tag="ul"
            :list="data.columns"
            v-bind="{
              group: { name: 'options' },
              ghostClass: 'ghost',
              handle: '.drag-item',
            }"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index">
              <i
                class="drag-item"
                style="font-size: 16px; margin: 0 5px; cursor: move"
              >
                <i class="iconfont icon-icon_bars"></i>
              </i>
              <el-input
                placeholder="span"
                size="mini"
                style="width: 100px"
                type="number"
                v-model.number="item.span"
              ></el-input>

              <el-button
                @click="handleOptionsRemove(index)"
                circle
                plain
                type="danger"
                size="mini"
                icon="el-icon-minus"
                style="padding: 4px; margin-left: 5px"
              ></el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px">
            <el-button type="text" @click="handleAddColumn"
              >Add Column</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="justify">
          <el-select v-model="data.options.justify">
            <el-option value="start" label="justifyStart"></el-option>
            <el-option value="end" label="justifyEnd"></el-option>
            <el-option value="center" label="justifyCenter"></el-option>
            <el-option
              value="space-around"
              label="justifySpaceAround"
            ></el-option>
            <el-option
              value="space-between"
              label="justifySpaceBetween"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="align">
          <el-select v-model="data.options.align">
            <el-option value="top" label="alignTop"></el-option>
            <el-option value="middle" label="alignMiddle"></el-option>
            <el-option value="bottom" label="alignBottom"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type != 'grid'">
        <el-form-item label="attribute">
          <el-checkbox
            v-model="data.options.readonly"
            v-if="Object.keys(data.options).indexOf('readonly') >= 0"
            >readonly</el-checkbox
          >
          <el-checkbox
            v-model="data.options.disabled"
            v-if="Object.keys(data.options).indexOf('disabled') >= 0"
            >disabled</el-checkbox
          >
          <el-checkbox
            v-model="data.options.editable"
            v-if="Object.keys(data.options).indexOf('editable') >= 0"
            >editable</el-checkbox
          >
          <el-checkbox
            v-model="data.options.clearable"
            v-if="Object.keys(data.options).indexOf('clearable') >= 0"
            >clearable</el-checkbox
          >
          <el-checkbox
            v-model="data.options.arrowControl"
            v-if="Object.keys(data.options).indexOf('arrowControl') >= 0"
            >arrowControl</el-checkbox
          >
          <el-checkbox
            v-model="data.options.isDelete"
            v-if="Object.keys(data.options).indexOf('isDelete') >= 0"
            >isDelete</el-checkbox
          >
          <el-checkbox
            v-model="data.options.isEdit"
            v-if="Object.keys(data.options).indexOf('isEdit') >= 0"
            >isEdit</el-checkbox
          >
        </el-form-item>
        <el-form-item label="validate">
          <validate-rule
            :data="data"
            @validateRequired="validateRequired"
            @validateDataType="validateDataType"
            @valiatePattern="valiatePattern"
          ></validate-rule>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import ValidateRule from "./ValidateRule";

export default {
  components: {
    Draggable,
    ValidateRule,
  },
  props: ["data"],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null,
      },
    };
  },
  computed: {
    show() {
      if (this.data && Object.keys(this.data).length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    handleOptionsRemove(index) {
      if (this.data.type === "grid") {
        this.data.columns.splice(index, 1);
      } else {
        this.data.options.options.splice(index, 1);
      }
    },
    handleAddOption() {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: "New Option",
          label: "New Option",
        });
      } else {
        this.data.options.options.push({
          value: "New Option",
        });
      }
    },
    handleAddColumn() {
      this.data.columns.push({
        span: "",
        list: [],
      });
    },
    generateRule() {
      this.data.rules = [];
      Object.keys(this.validator).forEach((key) => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key]);
        }
      });
    },
    handleSelectMuliple(value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue];
        } else {
          this.data.options.defaultValue = [];
        }
      } else {
        if (this.data.options.defaultValue.length > 0) {
          this.data.options.defaultValue = this.data.options.defaultValue[0];
        } else {
          this.data.options.defaultValue = "";
        }
      }
    },

    validateRequired(val, errMsg) {
      if (val) {
        this.validator.required = {
          required: true,
          message: errMsg ? errMsg : `${this.data.name}Required`,
        };
      } else {
        this.validator.required = null;
      }

      this.$nextTick(() => {
        this.generateRule();
      });
    },

    validateDataType(val, errMsg) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.type = {
          type: val,
          message: errMsg ? errMsg : this.data.name + "Invaild format",
        };
      } else {
        this.validator.type = null;
      }

      this.generateRule();
    },
    valiatePattern(val, errMsg) {
      if (!this.show) {
        return false;
      }

      if (val) {
        this.validator.pattern = {
          pattern: val,
          message: errMsg ? errMsg : "Unmatched pattern",
        };
      } else {
        this.validator.pattern = null;
      }

      this.generateRule();
    },
  },
  watch: {
    "data.options.isRange": function (val) {
      if (typeof val !== "undefined") {
        if (val) {
          this.data.options.defaultValue = null;
        } else {
          if (Object.keys(this.data.options).indexOf("defaultValue") >= 0)
            this.data.options.defaultValue = "";
        }
      }
    },
    "data.name": function (val) {
      if (this.data.options) {
        this.validateRequired(this.data.options.required);
        this.validateDataType(this.data.options.dataType);
        this.valiatePattern(this.data.options.pattern);
      }
    },
  },
};
</script>
