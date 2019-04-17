import Vue from 'vue';
import Vuex from 'vuex';
import * as isUUID from 'is-uuid';
import { createApi } from '../api';
import * as monaco from 'monaco-editor';
import utils from '../utils';
import * as crypto from 'crypto-js';

const api = createApi();

const sidExists = () => {
  const m = document.cookie.match(/sid=(.+?)($|;)/);
  if (!m) return false;
  return isUUID.v4(m[1]);
};

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      phone: '',
      student_id: '',
      nickname: '',
      realname: '',
      gender: '',
    },
    isLogin: sidExists(),

    courses: [] as ICourse[],
    assignments: [] as IAssignment[],

    codes: [] as ICode[],
    workId: 0,
    workName: '',
    workList: [] as { name: string, id: number }[],
    currentCodeFilename: '',
    currentCodeIndex: 0,
    currentCodeId: 0,
    editor: null as monaco.editor.IStandaloneCodeEditor | null,
    models: [] as monaco.editor.ITextModel[],
  },
  getters: {
    isLogin: state => state.isLogin,
    userNickname: state => state.user.nickname,
    userId: state => state.user.id,
    workId: state => state.workId,
    courses: state => state.courses,
    assignments: state => state.assignments,
    workList: state => state.workList,
    files: state => state.codes.map(c => ({
      filename: c.filename,
      notSaved: c.notSaved,
    })),
    currentFile: state => state.currentCodeFilename,
    compiledSrc: state => {
      if (state.workId === 0) return 'about:blank';
      return `http://localhost:3000/api/work/${state.workId}/compiled`;
    },
    iframeDomain: state => document.location.host === 'localhost:8000' ? 'http://localhost:3000' : 'http://cn.sgly.cf',
  },
  mutations: {
    setAssignmentList(state, assignments: IAssignment[]) {
      assignments.sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
      assignments.forEach(a => {
        const d = new Date(a.deadline);
        a.deadlineStr = utils.dateFormat(d, 'YYYY-MM-DD HH:mm:SS');
        if (a.submission.submitTime) {
          const s = new Date(a.submission.submitTime);
          a.submission.submitTimeStr = utils.dateFormat(s, 'YYYY-MM-DD HH:mm:SS');
        }
      });
      state.assignments = assignments;
    },
    setCourseList(state, courses: ICourse[]) {
      state.courses = courses;
    },
    setCourseRegistered(state, courseId: number) {
      const c = state.courses.find(c => c.id === courseId);
      if (!c) return;
      c.registered = true;
    },
    setLogin(state, login: boolean) {
      state.isLogin = login;
    },
    setUser(state, user) {
      const { id, phone, student_id, nickname, realname, gender } = user;
      state.user = { id, phone, student_id, nickname, realname, gender };
    },
    setWorkId(state, workId: number) {
      state.workId = workId;
    },
    setWork(state, work: IWork) {
      state.workName = work.name;
      state.workId = work.id;
      state.codes = work.codes;
      state.codes.forEach(c => {
        c.hash = crypto.SHA1(c.content).toString();
        c.notSaved = false;
      });
      state.models = work.codes.map(
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
      const code = state.codes[i];
      Vue.set(state.codes, i, {
        content,
        hash: crypto.SHA1(content).toString(),
        id: code.id,
        filename: code.filename,
        type: code.type,
        notSaved: true,
      });
    },
    updateUnsaveState(state, { codeId, hash }: { codeId: number, hash: string }) {
      const code = state.codes.find(c => c.id === codeId);
      if (!code) return;
      if (code.hash === hash) code.notSaved = false;
    },
  },
  actions: {
    async submitAssignment({ dispatch }, { workId, assignmentId }: { workId: number, assignmentId: number }) {
      const timestamp = Math.floor(Date.now() / 1000);
      const res = await api.assignment.submit(assignmentId, workId, timestamp);
      dispatch('getAssignmentListByUser');
      return res.data;
    },
    async getAssignmentListByUser({ commit }) {
      const res = await api.assignment.listByUser();
      if (res.data.success === 1) {
        commit('setAssignmentList', res.data.assignments);
      }
      return res.data;
    },
    async getCourseList({ commit }, { offset }: { offset: number }) {
      const res = await api.course.list(offset);
      if (res.data.success === 1) {
        commit('setCourseList', res.data.courses);
      }
      return res.data;
    },
    async registerCourse({ commit, dispatch }, { courseId }: { courseId: number }) {
      const res = await api.course.register(courseId);
      if (res.data.success === 1) {
        commit('setCourseRegistered', courseId);
        dispatch('getAssignmentListByUser');
      }
      return res.data;
    },
    async getUserInfo({ commit, dispatch }) {
      const res = await api.user.me();
      if (res.data.success === 1) {
        commit('setUser', res.data);
        dispatch('getWorkList');
        dispatch('getCourseList', { offset: 0 });
        dispatch('getAssignmentListByUser');
      } else {
        commit('setLogin', false);
      }
      return res.data;
    },
    async register({ commit, dispatch }, { phone, password }: { phone: string, password: string }) {
      const res = await api.user.register(phone, password);
      if (res.data.success === 1) {
        commit('setLogin', true);
        dispatch('getWorkList');
        dispatch('getUserInfo');
        dispatch('getCourseList', { offset: 0 });
        dispatch('getAssignmentListByUser');
      }
      return res;
    },
    async login({ commit, dispatch }, { phone, password }: { phone: string, password: string }) {
      const res = await api.user.login(phone, password);
      if (res.data.success === 1) {
        commit('setLogin', true);
        commit('setUser', res.data);
        dispatch('getWorkList');
        dispatch('getCourseList', { offset: 0 });
        dispatch('getAssignmentListByUser');
      }
      return res;
    },
    async getWorkList({ commit }) {
      const res = await api.work.getWorkList();
      commit('setWorkList', res.data);
    },
    async getWork({ commit }, { workId }: { workId: number }) {
      commit('setWorkId', workId);
      const res = await api.work.getWork(workId);
      commit('setWork', res.data);
      commit('switchCode', 0);
    },
    async newWork({ commit }, { name }: { name: string }) {
      const res = await api.work.newWork(name);
      commit('setWorkId', res.data.id);
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
    modifyCode: utils.debounce(1000,
      async function({ commit }, { codeId, content }: { codeId: number, content: string }) {
        const res = await api.work.updateCode(codeId, content);
        commit('updateUnsaveState', {
          codeId, hash: res.data.hash,
        });
        return res.data.success;
      },
    ),
    async addCode({ state, commit }, { filename, type }: { filename: string, type: string }) {
      const res = await api.work.addCode(state.workId, filename, type);
      state.codes.push({
        content: '',
        id: res.data.codeId,
        filename, type,
        notSaved: false,
        hash: crypto.SHA1('').toString(),
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
    async downloadRaw({ state }) {
      const res = await api.work.downloadRaw(
        state.workId,
        `${state.user.nickname} - ${state.workName}.zip`,
      );
    },
    async downloadCompiled({ state }) {
      const res = await api.work.downloadCompiled(
        state.workId,
        `${state.user.nickname} - ${state.workName}.html`,
      );
    },
  },
});
