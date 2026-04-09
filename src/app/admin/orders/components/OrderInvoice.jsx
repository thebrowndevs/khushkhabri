// app/components/OrderInvoice.jsx
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';

// Register a font that supports the Indian Rupee symbol
Font.register({
    family: 'Roboto',
    src: '/fonts/Roboto-Regular.ttf', // ensure this font file is available in your public/fonts folder
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        padding: 30,
        position: 'relative'
    },
    borderContainer: {
        flex: 1,
        border: '1px solid #000',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottom: '1px solid #ccc',
        paddingBottom: 15
    },
    companyDetails: {
        width: '60%'
    },
    customerDetails: {
        width: '35%'
    },
    invoiceMeta: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    metaColumn: {
        marginLeft: 20
    },
    section: {
        marginBottom: 15
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        borderBottom: '1px solid #eee',
        paddingBottom: 3
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        borderBottom: '1px solid #ccc'
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottom: '1px solid #eee'
    },
    col1: { width: '5%', paddingRight: 5 },
    col2: { width: '35%', paddingRight: 5 },
    col3: { width: '8%', paddingRight: 5 },
    col4: { width: '10%', paddingRight: 5 },
    col5: { width: '12%', paddingRight: 10 },  // Increased padding for better spacing
    col6: { width: '12%', paddingRight: 5 },
    col7: { width: '18%', paddingRight: 5 },   // Slightly wider for Total
    textRight: { textAlign: 'right' },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15
    },
    summaryBox: {
        width: '50%'
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    footer: {
        flexDirection: 'row',
        marginTop: 40,
        paddingTop: 10,
        borderTop: '1px solid #ccc'
    },
    terms: {
        width: '60%'
    },
    signature: {
        width: '40%',
        alignItems: 'flex-end'
    },
    signatureBox: {
        border: '1px solid #000',
        padding: 10,
        marginTop: 30,
        width: 150,
        textAlign: 'center'
    },
    text: {
        fontSize: 10,
        marginBottom: 3
    },
    textBold: {
        fontWeight: 'bold'
    },
    textLarge: {
        fontSize: 12
    }
});

// Format date to "12 Jun 2025" format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

function calculateTaxes(price, quantity) {
    const total = price * quantity;
    const taxableValue = total / 1.05;
    const igstAmount = total - taxableValue;

    return {
        taxableValue: parseFloat(taxableValue.toFixed(2)),
        igstAmount: parseFloat(igstAmount.toFixed(2)),
        total: parseFloat(total.toFixed(2))
    };
}

export function OrderInvoice({ order }) {
    // Calculate invoice totals
    let totalTaxableValue = 0;
    let totalIgst = 0;
    let totalQuantity = 0;

    const itemsWithTax = order.cart.map(item => {
        const taxes = calculateTaxes(item.price, item.quantity);
        totalTaxableValue += taxes.taxableValue;
        totalIgst += taxes.igstAmount;
        totalQuantity += item.quantity;

        return {
            ...item,
            ...taxes
        };
    });

    // Calculate payment details
    const paidAmount = order.paymentStatus === 'paid' ? order.totalAmount : 0;
    const balance = order.totalAmount - paidAmount;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.borderContainer}>
                    {/* Header with company details */}
                    <View style={styles.header}>
                        <View style={styles.companyDetails}>
                            <Image src="/logo.png" style={{ width: 80, marginBottom: 10 }} />
                            <Text style={styles.text}>RGLS Wellness</Text>
                            <Text style={styles.text}>Kirdhan Rd, Dhingsara, Haryana, India - 125050</Text>
                            <Text style={styles.text}>Tel: +91 8569996206</Text>
                            <Text style={styles.text}>Website: www.trivenika.in</Text>
                            <Text style={styles.text}>Email: trivenikaorganic4u@gmail.com</Text>
                            <Text style={[styles.text, styles.textBold]}>GSTIN: 09AAACH7409R1ZZ</Text>
                        </View>

                        <View style={styles.customerDetails}>
                            <Text style={[styles.text, styles.textBold]}>Customer Details:</Text>
                            <Text style={styles.text}>{order.shippingDetails.fullName}</Text>
                            <Text style={styles.text}>Phone: {order.shippingDetails.contact}</Text>
                            <Text style={styles.text}>Email: {order.shippingDetails.email}</Text>
                            <Text style={styles.text}>
                                {order.shippingDetails.address}, {order.shippingDetails.state} - {order.shippingDetails.pin}
                            </Text>
                        </View>
                    </View>

                    {/* Invoice metadata */}
                    <View style={styles.invoiceMeta}>
                        <View style={styles.metaColumn}>
                            <Text style={styles.text}>Invoice No:</Text>
                            <Text style={styles.text}>Invoice Date:</Text>
                            <Text style={styles.text}>Delivery Date:</Text>
                        </View>
                        <View style={styles.metaColumn}>
                            <Text style={[styles.text, styles.textBold]}>{order._id}</Text>
                            <Text style={[styles.text, styles.textBold]}>
                                {formatDate(order.createdAt)}
                            </Text>
                            <Text style={[styles.text, styles.textBold]}>
                                {formatDate(order.updatedAt)}
                            </Text>
                        </View>
                    </View>

                    {/* Items table */}
                    <View style={styles.section}>
                        <Text style={styles.heading}>Items</Text>

                        {/* Table header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.col1, styles.text, styles.textBold]}>S.No</Text>
                            <Text style={[styles.col2, styles.text, styles.textBold]}>Name of Product</Text>
                            <Text style={[styles.col3, styles.text, styles.textBold]}>Qty</Text>
                            <Text style={[styles.col4, styles.text, styles.textBold]}>HSN/SAC</Text>
                            <Text style={[styles.col5, styles.text, styles.textBold, styles.textRight]}>Taxable Value</Text>
                            <Text style={[styles.col6, styles.text, styles.textBold]}>IGST (5%)</Text>
                            <Text style={[styles.col7, styles.text, styles.textBold, styles.textRight]}>Total</Text>
                        </View>

                        {/* Table rows */}
                        {itemsWithTax.map((item, i) => (
                            <View key={i} style={styles.tableRow}>
                                <Text style={[styles.col1, styles.text]}>{i + 1}</Text>
                                <Text style={[styles.col2, styles.text]}>{item.serviceName} ({item.variantName})</Text>
                                <Text style={[styles.col3, styles.text]}>{item.quantity}</Text>
                                <Text style={[styles.col4, styles.text]}>0405</Text>
                                <Text style={[styles.col5, styles.text, styles.textRight]}>{item.taxableValue.toFixed(2)}</Text>
                                <Text style={[styles.col6, styles.text]}>{item.igstAmount.toFixed(2)}</Text>
                                <Text style={[styles.col7, styles.text, styles.textRight]}>{item.total.toFixed(2)}</Text>
                            </View>
                        ))}

                        {/* Table footer */}
                        <View style={[styles.tableRow, { backgroundColor: '#f9f9f9' }]}>
                            <Text style={[styles.col1, styles.text]}></Text>
                            <Text style={[styles.col2, styles.text, styles.textBold]}>Total</Text>
                            <Text style={[styles.col3, styles.text, styles.textBold]}>{totalQuantity}</Text>
                            <Text style={[styles.col4, styles.text]}></Text>
                            <Text style={[styles.col5, styles.text, styles.textBold, styles.textRight]}>{totalTaxableValue.toFixed(2)}</Text>
                            <Text style={[styles.col6, styles.text, styles.textBold]}>{totalIgst.toFixed(2)}</Text>
                            <Text style={[styles.col7, styles.text, styles.textBold, styles.textRight]}>{order.totalAmount.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Summary section */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryBox}>
                            <View style={styles.summaryRow}>
                                <Text style={[styles.text, styles.textBold]}>Sub Total:</Text>
                                <Text style={[styles.text, styles.textRight]}>₹{totalTaxableValue.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={[styles.text, styles.textBold]}>Tax Amount:</Text>
                                <Text style={[styles.text, styles.textRight]}>₹{totalIgst.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={[styles.text, styles.textBold]}>Total Amount:</Text>
                                <Text style={[styles.text, styles.textRight]}>₹{order.totalAmount.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={[styles.text, styles.textBold]}>Amount Paid:</Text>
                                <Text style={[styles.text, styles.textRight]}>₹{paidAmount.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={[styles.text, styles.textBold]}>Balance:</Text>
                                <Text style={[styles.text, styles.textRight]}>₹{balance.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View style={styles.terms}>
                            <Text style={[styles.text, styles.textBold]}>Terms & Conditions:</Text>
                            <Text style={styles.text}>1. Goods once sold will not be taken back.</Text>
                            <Text style={styles.text}>2. Payment should be made in full.</Text>
                        </View>
                        <View style={styles.signature}>
                            <View style={styles.signatureBox}>
                                <Text style={styles.text}>For Trivenika</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}