import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import NiceTextField from "app/views/Component/Form/NiceTextField";
import NiceDatePicker from "../../Component/Form/NiceDatePicker";
import NiceCheckbox from "app/views/Component/Form/NiceCheckbox";
import ClassifyPatientIncident from "./ClassifyPatientIncident";
import ResultPatientIncident from "./ResultPatientIncident";
import PatientIncidentLabTests from "./PatientIncidentLabTests";
import PatientDetailHandle from "./PatientDetailHandle";
export default function PatientIncident(props) {
    const { t, formik, classes, listLabTest, disabled } = props;

    return (
        <Grid container>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <fieldset>
                        <Grid container spacing={4}>
                            <Grid className="mt-16" item sm={12}>
                                <NiceTextField
                                    formik={formik}
                                    label="Mô tả đặc điểm biến cố"
                                    field="description"
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item sm={12}>
                                <PatientIncidentLabTests
                                    t={t}
                                    formik={formik}
                                    listLabTest={listLabTest}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </fieldset>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <fieldset>
                        <Grid container spacing={2}>
                            <Grid className="mt-16" item lg={6} md={6} sm={12} xs={12}>
                                <NiceDatePicker
                                    formik={formik}
                                    label="Ngày bắt đầu xảy ra biến cố"
                                    format={"dd/MM/yyyy"}
                                    field={"appearDate"}
                                    size="small"
                                    inputVariant="outlined"
                                    disableFuture={true}
                                    maxDateMessage={t("general.maxDateMessage")}
                                    invalidDateMessage={t("general.invalidDateMessage")}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid className="mt-16" item lg={6} md={6} sm={12} xs={12}>
                                <NiceDatePicker
                                    formik={formik}
                                    label="Ngày bắt phục hổi biến cố (Nếu có)"
                                    format={"dd/MM/yyyy"}
                                    field={"recoveryDay"}
                                    size="small"
                                    inputVariant="outlined"
                                    disableFuture={true}
                                    maxDateMessage={t("general.maxDateMessage")}
                                    invalidDateMessage={t("general.invalidDateMessage")}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid container item sx={12}>
                                <Grid sm={12} xs={12}>
                                    <h4>MỨC ĐỘ NGHIỆM TRỌNG CỦA BIẾN CỐ</h4>
                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Grid sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="severityDead"
                                            size="small"
                                            label={"Tử vong"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="severityHospitalizationOrExtensionOfHospitalStay"
                                            size="small"
                                            label={"Nhập viện/kéo dài thời gian nằm viện"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>

                                    <Grid sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="severityChangeTBTreatmentRegimen"
                                            size="small"
                                            label={"Thay đổi phác đồ điều trị lao"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid sm={12} xs={12} class="flex">
                                        <Grid sm={3} xs={3}>
                                            <NiceCheckbox
                                                formik={formik}
                                                classes={classes}
                                                field="severityOther"
                                                size="small"
                                                label={"Khác"}
                                                disabled={disabled ? disabled : false}
                                            />
                                        </Grid>
                                        <Grid sm={9} xs={9}>
                                            <NiceTextField
                                                formik={formik}
                                                label="Cụ thể"
                                                field="severityInstrument"
                                                size="small"
                                                type="text"
                                                variant="outlined"
                                                disabled={disabled ? disabled : false}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Grid sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="severityLifeThreatening"
                                            size="small"
                                            label={"Đe dọa tính mạng"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="severityPermanentOrSeverelyBurdensome"
                                            size="small"
                                            label={"Tàn tật vĩnh viễn/nặng nề"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="severityFetalMalformation"
                                            size="small"
                                            label={"Dị tật thai nhi"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sm={12}>
                                <h4>MỨC ĐỘ NẶNG CỦA BIẾN CỐ</h4>
                                <ClassifyPatientIncident
                                    t={t}
                                    formik={formik}
                                    field="seriousLevel"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <h4>CÁCH XỬ TRÍ BIẾN CỐ</h4>
                                <Grid container item sx={12} spacing={1}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="incidentHandlingStoppingDrug"
                                            size="small"
                                            label={"Tạm ngừng thuốc"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="incidentHandlingStopDrug"
                                            size="small"
                                            label={"Ngừng thuốc"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="incidentHandlingReduceDose"
                                            size="small"
                                            label={"Giảm liều "}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="incidentHandlingChangeTBMedicine"
                                            size="small"
                                            label={"Đổi thuốc lao"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="incidentHandlingSymptomaticTreatment"
                                            size="small"
                                            label={"Điều trị triệu chứng "}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <NiceCheckbox
                                            formik={formik}
                                            classes={classes}
                                            field="incidentHandlingOther"
                                            size="small"
                                            label={"Xử trí khác"}
                                            disabled={disabled ? disabled : false}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid sm={12}>
                                    <PatientDetailHandle
                                        t={t}
                                        formik={formik}
                                        disabled={disabled ? disabled : false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item sm={12}>
                                <h4>KẾT QUẢ SAU XỬ TRÍ BIẾN CỐ</h4>
                                <ResultPatientIncident
                                    t={t}
                                    formik={formik}
                                    field="result"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </fieldset>
                </Grid>
            </Grid>
        </Grid>
    );
}
