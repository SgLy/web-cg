import Vuex from 'vuex';
import { createApi } from '../api';
import * as monaco from 'monaco-editor';

const api = createApi();

export default new Vuex.Store({
  state: {
    userId: 1,

    codes: [] as ICode[],
    workId: 0,
    workList: [] as { name: string, id: number }[],
    currentCodeFilename: '',
    currentCodeIndex: 0,
    currentCodeId: 0,
    editor: null as monaco.editor.IStandaloneCodeEditor | null,
    models: [] as monaco.editor.ITextModel[],
  },
  getters: {
    userId: state => state.userId,
    workId: state => state.workId,
    workList: state => state.workList,
    filenames(state) {
      return state.codes.map(c => c.filename);
    },
    currentFile(state) {
      return state.currentCodeFilename;
    },
    compiledSrc: state => `http://localhost:3000/api/work/${state.workId}/compiled`,
  },
  mutations: {
    setWorkId(state, workId: number) {
      state.workId = workId;
    },
    setWork(state, work: IWork) {
      state.workId = work.id;
      state.codes = work.codes;
      state.models = work.codes. map(
        c => monaco.editor.createModel(c.content, c.type),
      );
    },
    setWorkList(state, workList: { name: string, id: number }[]) {
      state.workList = workList;
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
    async getWorkList({ commit }, { userId }: { userId: number }) {
      const res = await api.work.getWorkList(userId);
      commit('setWorkList', res.data);
    },
    async getWork({ commit }, { workId }: { workId: number }) {
      commit('setWorkId', workId);
      const res = await api.work.getWork(workId);
      commit('setWork', res.data);
      commit('switchCode', 0);
    },
    async newWork({ commit }, { name, userId }: { name: string, userId: number }) {
      const res = await api.work.newWork(userId, name);
      return res.data;
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
