import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import ViewHolder from "../views/ViewHolder.vue";
import PasswordReset from "../views/PasswordReset.vue";
import SetPassword from "../views/SetPassword.vue";
import SentPasswordSetMail from "../views/SentPasswordSetMail.vue";
import AuthLayout from "../components/AuthLayout.vue";
import { useUserStore } from "../store/user";
import Dashboard from "../views/Dashboard.vue";
import ClientIndex from "../views/clients/Index.vue";
import ClientShow from "../views/clients/Show.vue";
import WorkflowIndex from "../views/workflows/Index.vue";
import WorkflowShow from "../views/workflows/Show.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
	{
		path: "/",
		redirect: "/dashboard",
		component: DefaultLayout,
		meta: { requiresAuth: true },
		children: [
			{
				path: "/dashboard",
				name: "Dashboard",
				component: Dashboard,
			},
			{
				path: "/clients",
				component: ViewHolder,
				redirect: () => ({ name: "ClientIndex" }),
				children: [
					{
						path: "",
						name: "ClientIndex",
						component: ClientIndex,
					},

					// {
					// 	path: "create",
					// 	name: "ClientCreate",
					// 	component: ClientCreate,
					// },
					{
						path: ":id",
						name: "ClientShow",
						component: ClientShow,
					},
				],
			},
			{
				path: "/workflows",
				component: ViewHolder,
				redirect: () => ({ name: "WorkflowIndex" }),
				children: [
					{
						path: "",
						name: "WorkflowIndex",
						component: WorkflowIndex,
					},

					// {
					// 	path: "create",
					// 	name: "WorkflowCreate",
					// 	component: WorkflowCreate,
					// },
					{
						path: ":id",
						name: "WorkflowShow",
						component: WorkflowShow,
					},
				],
			},
		],
	},
	{
		path: "/auth",
		redirect: "login",
		name: "Auth",
		component: AuthLayout,
		meta: { isGuest: true },
		children: [
			{
				path: "/login",
				name: "Login",
				component: Login,
			},
			{
				path: "/register",
				name: "Register",
				component: Register,
			},
			{
				path: "/set-password/:token",
				name: "SetPassword",
				component: SetPassword,
			},
			{
				path: "/reset-password/:token",
				name: "ForgotPassword",
				component: PasswordReset,
			},
			{
				path: "/reset-password/:token",
				name: "ForgotPassword",
				component: PasswordReset,
			},
			{
				path: "/sent-password-set-mail",
				name: "SentPasswordSetMail",
				component: SentPasswordSetMail,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const userStore = useUserStore();

	if (to.meta.requiresAuth && !userStore.user.token) {
		next({ name: "Login" });
	} else if (userStore.user.token && to.meta.isGuest) {
		next({ name: "Dashboard" });
	} else {
		next();
	}
});

export default router;
