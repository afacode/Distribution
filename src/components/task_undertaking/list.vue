<template>
  <div>
      <div class="weui-form-preview">
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">任务名</label>
                    <span class="weui-form-preview__value">{{taskDetails.name}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">总奖金</label>
                    <span class="weui-form-preview__value">{{taskDetails.price}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">奖励</label>
                    <span class="weui-form-preview__value">{{taskDetails.viewUnitPrice}}元/每次浏览</span>
                </div>
                 <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">状态</label>
                    <span class="weui-form-preview__value">{{taskDetails.statusValue}}</span>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
  props: ['taskDetails'],
}
</script>

