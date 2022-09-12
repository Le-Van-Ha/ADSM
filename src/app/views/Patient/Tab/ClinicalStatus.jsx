import React, { useEffect } from 'react';
import {
    Grid,
    TextField,
} from '@material-ui/core';
import NiceTextFieldObject from '../../Component/Form/NiceTextFieldObject';
import NiceCheckboxObject from '../../Component/Form/NiceCheckboxObject';

export default function ClinicalStatus(props) {
    const {
        t,
        formik,
        classes,
        disabled
    } = props;
    useEffect(() => {
    }, ([]))
    return (
        <Grid container>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <fieldset>
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="exhausted"
                                    size="small"
                                    label={"Suy kiệt"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="alcoholism"
                                    size="small"
                                    label={"Nghiện rượu"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="addictionToCigarettes"
                                    size="small"
                                    label={"Nghiện thuốc lá"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="drugAddict"
                                    size="small"
                                    label={"Nghiện ma túy"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="pregnant"
                                    size="small"
                                    label={"Mang thai"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="breastfeeding"
                                    size="small"
                                    label={"Cho con bú"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="other"
                                    size="small"
                                    label={"Khác"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                        </Grid>
                    </fieldset>
                    <Grid className="mt-16" item sm={12} xs={12}>
                        <NiceTextFieldObject
                            formik={formik}
                            classes={classes}
                            nameObj="clinicalStatusDto"
                            field="allergyHistory"
                            size="small"
                            label={"Tiền sử dị ứng (Mô tả nếu có)"}
                            variant="outlined"
                            disabled={disabled ? disabled : false}
                        />
                    </Grid>
                </Grid>

                <Grid item md={6}>
                    <fieldset>
                        {/* <legend>{t('')}</legend> */}
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="hiv"
                                    size="small"
                                    label={"HIV"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="anemia"
                                    size="small"
                                    label={"Thiếu máu"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="diabetes"
                                    size="small"
                                    label={"Đái tháo đường"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="hearingDisease"
                                    size="small"
                                    label={"Bệnh thính giác"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="visionDisease"
                                    size="small"
                                    label={"Bệnh thị giác"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="liverDisease"
                                    size="small"
                                    label={"Bệnh gan"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="kidneyDisease"
                                    size="small"
                                    label={"Bệnh thận"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="heartDiseaes"
                                    size="small"
                                    label={"Bệnh tim mạch"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="musculoskeletalDisease"
                                    size="small"
                                    label={"Bệnh cơ xương khớp"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="psychosis"
                                    size="small"
                                    label={"Rối loạn tâm thần"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceCheckboxObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="otherComorbidities"
                                    size="small"
                                    label={"Khác"}
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <NiceTextFieldObject
                                    formik={formik}
                                    classes={classes}
                                    nameObj="clinicalStatusDto"
                                    field="descriptionComorbidities"
                                    size="small"
                                    label={"Khác"}
                                    variant="outlined"
                                    disabled={disabled ? disabled : false}
                                />
                            </Grid>
                        </Grid>
                    </fieldset>
                </Grid>

            </Grid>
        </Grid>
    )
}