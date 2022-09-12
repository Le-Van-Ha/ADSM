import ConstantList from "./appConfig";

export const navigations = [{
        name: "navigation.dashboard",
        icon: "dashboard",
        path: ConstantList.ROOT_PATH + "dashboard/analytics",
        isVisible: true,
    },
    {
        name: "Bệnh nhân",
        isVisible: true,
        icon: "person",
        children: [
            {
                name: "Thêm mới bệnh nhân",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "patient/create",
                icon: "add",
            },
            {
                name: "Danh sách bệnh nhân",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "patient/list",
                icon: "group",
            },
            {
                name: "Danh sách biến cố bất lợi",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "patient-incident/list",
                icon: "feed",
            }
        ]
    },
    {
        name: "navigation.directory",
        icon: "dashboard",
        path: "",
        isVisible: true,
        children: [
            {
                name: "navigation.drugs",
                path: ConstantList.ROOT_PATH + "drugs",
                icon: "group",
                isVisible: true,
            },{
                name: "navigation.administrative_unit",
                icon: "account_balance",
                path: ConstantList.ROOT_PATH + "administrative-unit",
                isVisible: true,
            }, {
                name: "navigation.health_unit",
                path: ConstantList.ROOT_PATH + "dashboard/health_org",
                icon: "public",
                isVisible: true,
            },
            // {
            //     name: "navigation.ethnicity",
            //     path: ConstantList.ROOT_PATH + "fhir/Ethnicity",
            //     icon: "group",
            //     isVisible: true,
            // },
            {
                name: "Xét nghiệm",
                path: ConstantList.ROOT_PATH + "lab-test",
                icon: "opacity",
                isVisible: true,
            },
        ]
    },
    {
        name: "navigation.manage.profile",
        isVisible: true,
        icon: "engineering",
        children: [{
                name: "navigation.manage.personal_info",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "user-profile",
                icon: "remove",
            },
            {
                name: "navigation.manage.change_password",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "user-change-password",
                icon: "remove",
            },
            {
                name: "navigation.manage.list_user",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "user-manage",
                icon: "remove",
            },
            {
                name: "navigation.manage.org_info",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "unit-information",
                icon: "remove",
            },
            {
                name: "navigation.manage.menu",
                isVisible: true,
                path: ConstantList.ROOT_PATH + "list/menu",
                icon: "remove",
            },
        ]
    },

];