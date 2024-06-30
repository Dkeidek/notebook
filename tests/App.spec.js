import { mount, createLocalVue } from '@vue/test-utils';
import NavBar from '@/components/Layout/NavBar.vue';
import ViewNotes from '@/views/ViewNotes.vue';
import ViewStats from '@/views/ViewStats.vue';
import VueRouter from 'vue-router';
import apiClient from '@/axios';

// Mocking the axios client
jest.mock('@/axios');

// Create a local Vue instance with VueRouter
const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App Components', () => {

    describe('NavBar.vue', () => {
        it('toggles mobile navigation', async () => {
            const wrapper = mount(NavBar, { localVue });
            const burger = wrapper.find('.navbar-burger');

            expect(wrapper.vm.showMobileNav).toBe(false);

            await burger.trigger('click');

            expect(wrapper.vm.showMobileNav).toBe(true);

            await burger.trigger('click');

            expect(wrapper.vm.showMobileNav).toBe(false);
        });
    });

    describe('ViewNotes.vue', () => {
        it('fetches and displays notes', async () => {
            apiClient.get.mockResolvedValue({ data: [{ id: 1, description: 'Test Note' }] });

            const wrapper = mount(ViewNotes, { localVue });

            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain('Test Note');
        });

        it('adds a new note', async () => {
            const newNoteDescription = 'New Test Note';
            apiClient.post.mockResolvedValue({
                data: { id: 2, description: newNoteDescription }
            });
            apiClient.get.mockResolvedValueOnce({ data: [{ id: 1, description: 'Test Note' }] })
                .mockResolvedValueOnce({ data: [{ id: 1, description: 'Test Note' }, { id: 2, description: newNoteDescription }] });

            const wrapper = mount(ViewNotes, { localVue });

            wrapper.setData({ newNote: newNoteDescription });
            await wrapper.find('button').trigger('click');

            await wrapper.vm.$nextTick();
            await wrapper.vm.$nextTick();

            expect(wrapper.text()).toContain(newNoteDescription);
        });
    });

    describe('ViewStats.vue', () => {
        it('renders stats page', () => {
            const wrapper = mount(ViewStats, { localVue });
            expect(wrapper.text()).toContain('Stats');
        });
    });

});
