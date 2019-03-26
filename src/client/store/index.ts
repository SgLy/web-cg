import Vuex from 'vuex';
import { createApi } from '../api';
import * as monaco from 'monaco-editor';

const api = createApi();

export default new Vuex.Store({
  state: {
    codes: [] as ICode[],
    workId: 0,
    currentCodeFilename: '',
    currentCodeIndex: 0,
    currentCodeId: 0,
    editor: null as monaco.editor.IStandaloneCodeEditor | null,
    models: [] as monaco.editor.ITextModel[],
  },
  getters: {
    filenames(state) {
      return state.codes.map(c => c.filename);
    },
    currentFile(state) {
      return state.currentCodeFilename;
    },
  },
  mutations: {
    setWork(state, work: IWork) {
      state.workId = work.id;
      state.codes = work.codes;
      state.models = work.codes. map(
        c => monaco.editor.createModel(c.content, c.type),
      );
    },
    switchCode(state, i: number) {
      if (i < 0 || i >= state.codes.length) return;
      state.editor!.setModel(state.models[i]);
      state.currentCodeIndex = i;
      state.currentCodeId = state.codes[i].id;
      state.currentCodeFilename = state.codes[i].filename;
    },
    initEditor(state, element: HTMLElement) {
      state.editor = monaco.editor.create(element, {
        value: '',
        language: 'javascript',
        automaticLayout: true,
      });
    },
    updateCode(state, { i, content }: { i: number, content: string }) {
      state.codes[i].content = content;
    },
  },
  actions: {
    async getWork({ commit }, { id }: { id: number }) {
      const res = await api.work.getWork();
      commit('setWork', res.data);
      commit('switchCode', 0);
    },
    async editorOnChange({ state, commit, dispatch }, { content }: { content: string }) {
      commit('updateCode', {
        i: state.currentCodeIndex,
        content,
      });
      dispatch('modifyCode', {
        codeId: state.currentCodeId,
        content,
      });
    },
    async modifyCode({ commit }, { codeId, content }: { codeId: number, content: string }) {
      const res = await api.work.updateCode(codeId, content);
      return res.data.success;
    },
    async addCode({ state, commit }, { filename, type }: { filename: string, type: string }) {
      const res = await api.work.addCode(state.workId, filename, type);
      state.codes.push({
        content: '',
        id: res.data.codeId,
        filename, type,
      });
      const model = monaco.editor.createModel('', type);
      state.models.push(model);
      commit('switchCode', state.codes.length - 1);
      return res.data.success;
    },
    async deleteCode({ state, commit }, { filename }: { filename: string }) {
      const index = state.codes.findIndex(c => c.filename === filename);
      if (index === -1) return 0;
      const file = state.codes[index];
      const codeId = file.id;
      const res = await api.work.deleteCode(codeId);
      if (res.data.success) {
        state.codes.splice(index, 1);
        if (filename === state.currentCodeFilename) {
          const newTabIndex = (index === state.codes.length) ? state.codes.length - 1 : index;
          commit('switchCode', newTabIndex);
        }
      }
      return res.data.success;
    },
  },
});
