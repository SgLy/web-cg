// recognize import 'SomeComp.vue'
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
