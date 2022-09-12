import React, { useEffect } from "react";
import {
    makeStyles,
    DialogActions,
    Button,
    DialogContent,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import TabPatient from "./TabPatient";
import { ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkETBCode } from "./PatientService";

const useStyles = makeStyles(() => ({
    root: {
        // padding: '10px 0'
    },
    gridItem: {
        margin: "10px 0 !important",
    },
    textField: {
        width: "100%",
    },
}));

export default function PatientForm(props) {
    const classes = useStyles();

    const {
        id,
        initialValues,
        handleSubmit,
        handleClose,
        pageIndex,
        pageSize,
        history,
        listLabTest,
        listDrug,
        readOnly,
    } = props;

    const { t } = useTranslation();

    const validationSchema = Yup.object()
        .shape({
            displayName: Yup.string().required("Họ và tên không được để trống").nullable(),
            eTBCode: Yup.string().required("Mã ETB không được để trống").nullable(),
            patientCode: Yup.string().required("Mã số BN không được để trống").nullable(),
            healthOrg: Yup.object().required("Cơ sở điều trị không được để trống").nullable(),
            gender: Yup.string().required("Giới tính không được để trống").nullable(),
            birthDate: Yup.string().required("Ngày sinh không được để trống").nullable(),
            // dateReport: Yup.date().max(new Date(), "Ngày báo cáo không được lớn hơn ngày hiện tại").required("Ngày báo cáo không được để trống").nullable(),
            height: Yup.string().required("Chiều cao không được để trống").nullable(),
            weight: Yup.string().required("Cân nặng không được để trống").nullable(),
            classify: Yup.string().required("Phân loại bênh nhân phải chọn").nullable(),
            tbDrugs: Yup.array().of(
                Yup.object().shape({
                    doseInDay: Yup.number("Liều dùng nhập vào phải bằng số").min(0, "Liều dùng lớn hơn 0"),
                    dayInWeek: Yup.number("Ngày dùng nhập vào phải bằng số").min(1, "Tối thiểu 1 ngày").max(7, "Tối đa 7 ngày"),
                })
            ),
        })
        .test("reportBy", null, (obj) => {
            if (tab === 5 && obj.reportBy) {
                return true;
            } else if (tab === 5 && !obj.reportBy) {
                if (isSubmit) {
                    setIsSubmit(false);
                };
                return new Yup.ValidationError(
                    "Người báo cáo không được để trống",
                    null,
                    "reportBy"
                );
            }
        })
        .test("dateReport", null, (obj) => {
            if (tab === 5 && obj.dateReport) {
                return true;
            } else if (tab === 5 && !obj.dateReport) {
                if (isSubmit) {
                    setIsSubmit(false);
                };
                return new Yup.ValidationError(
                    "Ngày báo cáo không được để trống",
                    null,
                    "dateReport"
                );
            }
        }).test("dateReport", null, (obj) => {
            let today = new Date();
            if (obj.dateReport <= today) {
                return true;
            } else {
                if (isSubmit) {
                    setIsSubmit(false);
                };
                return new Yup.ValidationError(
                    "Ngày báo cáo không được lớn hơn ngày hiện tại",
                    null,
                    "dateReport"
                );
            }
        })
        .test("person", null, (obj) => {
            if (obj.eTBCode || obj.patientCode || obj.healthOrg || obj.gender || obj.birthDate || obj.height || obj.weight || obj.classify || obj.tbDrugs) {
                return true;
            } else {
                if (isSubmit) {
                    setIsSubmit(false);
                    setTab(0);
                };
            }
        })
        .test("damagePosition", null, (obj) => {
            if (
                obj.lungDamage ||
                obj.outOfLungDamage ||
                obj.bothDamage ||
                obj.unknown
            ) {
                return true;
            } else {
                if (isSubmit) {
                    setIsSubmit(false);
                    setTab(0);
                } return new Yup.ValidationError(
                    "Vị trí tổn thương cần phải chọn",
                    null,
                    "damagePosition"
                );
            }
        })

    const [tab, setTab] = React.useState(0);
    const [isSubmit, setIsSubmit] = React.useState(false);
    const formik = useFormik({
        validateOnChange: true,
        enableReinitialize: true,
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let today = new Date();
            let checkDate = values.tbDrugs.some(item => item.startDate > today);
            if (values.eTBCode === values.patientCode && values.eTBCode != null && values.patientCode != null) {
                toast.warning(t("toast.duplicate_etb_patient_code"));
                setTab(0);
            } else if (values.birthDate > today) {
                toast.warning("Ngày sinh nhật không được lớn hơn ngày hiện tại");
                setTab(0);
            } else if (checkDate) {
                toast.warning("Ngày bắt đầu sử dụng thuốc không được lớn hơn ngày hiện tại");
                setTab(3);
            } else {
                checkETBCode(id, values.eTBCode).then((result) => {
                    if (result.data === true) {
                        toast.warning(t("toast.error_duplicate_etb"));
                        setTab(0);
                    } else {
                        if (tab != 5) {
                            setTab(tab + 1);
                        } else {
                            handleSubmit(values);
                            setTab(0);
                        }
                    }
                });
            }
        },
    });

    const [
        shouldOpenConfirmationDeleteListDialog,
        setShouldOpenConfirmationDeleteListDialog,
    ] = React.useState(false);

    const handleConfirmCloseOpen = () => {
        setShouldOpenConfirmationDeleteListDialog(true);
    };

    const handleConfirmClose = () => {
        setShouldOpenConfirmationDeleteListDialog(false);
    };

    return (
        <div className={classes.root}>
            {shouldOpenConfirmationDeleteListDialog && (
                <ConfirmationDialog
                    open={shouldOpenConfirmationDeleteListDialog}
                    onConfirmDialogClose={handleConfirmClose}
                    onYesClick={() => {
                        handleClose(history, pageIndex, pageSize);
                    }}
                    title={t("confirm_dialog.confirm_close.title")}
                    text={t("confirm_dialog.confirm_close.text")}
                    agree={t("confirm_dialog.confirm_close.agree")}
                    cancel={t("confirm_dialog.confirm_close.cancel")}
                />
            )}
            <form onSubmit={formik.handleSubmit}>
                <div className="">
                    <DialogContent className="o-hidden">
                        <TabPatient
                            id={id}
                            formik={formik}
                            listLabTest={listLabTest}
                            listDrug={listDrug}
                            history={history}
                            disabled={readOnly ? readOnly : false}
                            tab={tab}
                            setTab={setTab}
                        />
                    </DialogContent>
                </div>
                <div className="dialog-footer">
                    <DialogActions className="p-0">
                        <div className="flex flex-space-between flex-middle">
                            <Button
                                startIcon={<BlockIcon />}
                                variant="contained"
                                className="mr-12 btn btn-secondary d-inline-flex"
                                color="secondary"
                                onClick={handleConfirmCloseOpen}
                            >
                                {t("general.button.exit")}
                            </Button>
                            <Button
                                startIcon={<SaveIcon />}
                                className="mr-0 btn btn-success d-inline-flex"
                                variant="contained"
                                color="primary"
                                disabled={readOnly ? readOnly : false}
                                type="submit"
                                onClick={() => {
                                    setIsSubmit(true)
                                }}
                            >
                                {tab != 5 ? t("general.button.saveContinue") : t("general.button.save")}
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </form>
        </div>
    );
}
