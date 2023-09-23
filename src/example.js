<Formik
enableReinitialize
initialValues={
    excelHeaders && excelHeaders.map((header, i) => ({
        [header]: ''
    }))
}
// validationSchema={CallSchema}
onSubmit={values => {
    console.log(values)
}}>
{({ errors, touched, isSubmitting, setFieldValue, setFieldTouched, values, ...rest }) => (

    <Form className="form-background">
        {
            excelHeaders && excelHeaders.map((header, i) => {
                return (<Field
                    name={header}
                    placeholder='Call Type'
                    component={SelectComponent}
                    options={contactMatchingFields && contactMatchingFields}
                />)
            })
        }
        <Button type='primary' htmlType='submit'>Submit Contact</Button>
    </Form>
)}
</Formik>