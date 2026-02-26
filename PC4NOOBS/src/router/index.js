import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import GuidesLayout from '@/views/guides/GuidesLayout.vue';

import MainComponentsView from '@/views/guides/MainComponentsView.vue';
import CaseView from '@/views/guides/CaseView.vue';
import MotherboardView from '@/views/guides/MotherboardView.vue';
import CPUView from '@/views/guides/CPUView.vue';
import RAMView from '@/views/guides/RAMView.vue';
import MemoryView from '@/views/guides/MemoryView.vue';
import PowerSupplyView from '@/views/guides/PowerSupplyView.vue';
import GraphicsCardView from '@/views/guides/GraphicsCardView.vue';
import AdditionalView from '@/views/guides/AdditionalView.vue';

import BuildView from '@/views/guides/BuildView.vue';
import BuildToolsView from '@/views/guides/BuildToolsView.vue';
import BuildCPUMotherboardView from '@/views/guides/BuildCPUMotherboardView.vue';
import BuildRAMMotherboardView from '@/views/guides/BuildRAMMotherboardView.vue';
import BuildMemoryMotherboardView from '@/views/guides/BuildMemoryMotherboardView.vue';
import BuildCaseMotherboardView from '@/views/guides/BuildCaseMotherboardView.vue';

import ImprintView from '@/views/legal/ImprintView.vue';
import TermsView from '@/views/legal/TermsView.vue';
import PrivacyView from '@/views/legal/PrivacyView.vue';

import AccountView from '@/views/AccountView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },

    { path: "/account", name: "account", component: AccountView },

    { path: "/imprint", name: "imprint", component: ImprintView },
    { path: "/terms", name: "terms", component: TermsView },
    { path: "/privacy", name: "privacy", component: PrivacyView },

    { path: "/guides", component: GuidesLayout, children: [
        { path: "", redirect: "/guides/main-components" },

        { path: "main-components", name: "main-components", component: MainComponentsView },
        { path: "case", name: "case", component: CaseView },
        { path: "motherboard", name: "motherboard", component: MotherboardView },
        { path: "cpu", name: "cpu", component: CPUView },
        { path: "ram", name: "ram", component: RAMView },

        { path: "storage", name: "storage", component: MemoryView },

        { path: "power-supply", name: "power-supply", component: PowerSupplyView },
        { path: "graphics-card", name: "graphics-card", component: GraphicsCardView },
        { path: "other", name: "other", component: AdditionalView },

        { path: "build", name: "build", component: BuildView },
        { path: "build-tools", name: "build-tools", component: BuildToolsView },
        { path: "build-cpu-motherboard", name: "build-cpu-motherboard", component: BuildCPUMotherboardView },
        { path: "build-ram-motherboard", name: "build-ram-motherboard", component: BuildRAMMotherboardView },
        { path: "build-storage-motherboard", name: "build-storage-motherboard", component: BuildMemoryMotherboardView },
        { path: "build-case-motherboard", name: "build-case-motherboard", component: BuildCaseMotherboardView },
      ],
    },
  ],
});

export default router;