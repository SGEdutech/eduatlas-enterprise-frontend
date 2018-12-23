// playground requires you to assign document definition to a variable called dd

const docDefinition = {
	pageSize: 'A4',
	pageMargins: [40, 60, 40, 60],
	footer: {
		fontSize: 10,
		margin: [40, 0, 0, 0],
		stack: [
			'SG Edutech',
			'8906784568',
			'www.eduatlas.com',
			{ text: 'this invoice cum receipt is electronically generated and does not require any sign' }
		],
	},
	content: [
		{
			margin: [0, 0, 0, 30],
			style: 'header',
			text: 'Invoice'
		},
		{
			alignment: 'justify',
			columns: [
			{
				width: '*',
				stack: [
					{ text: 'From', style: 'bigger' },
					// 'SG Edutech',
					// 'Palam Vihar, Gurgaon',
					// 'Haryana, 122017',
					// 'India',
					// 'Tax ID: 23534654765876',
					// { text: 'To', style: 'bigger' },
					// 'Navjot Singh',
					// 'India'
				],

			},
			{
				width: '*',
				stack: [
					{ text: 'Invoice Number', style: 'bigger' },
					'INV 5',
					{ text: 'Date', style: 'bigger' },
					'Sep 15 2018'
				],
			}]
		},
		{
			margin: [0, 20, 0, 0],
			table: {
				headerRows: 1,
				widths: ['*', 'auto'],
				body: [
					[{ text: 'Description', bold: true }, { text: 'Amount', bold: true }],
					['Certificate Program in Digital Marketing', '29000.00'],
				]
			}
		},
		{
			margin: [0, 20, 0, 0],
			alignment: 'justify',
			columns: [
			{
				width: '*',
				text: '',

			},
			{
				columns: [
				{
					width: '*',
					stack: [
						{ text: 'Sub Total' },
						// { text: 'Coupon1 (9993.30)' },
						// { text: 'Additional Discount' },
						// { text: 'GST (18%)' },
						// { text: 'Total', style: 'bigger' },
						// { text: 'Paid To Date', style: 'bigger' },
						// { text: 'Balance', style: 'bigger' },
					],
				},
				{
					alignment: 'right',
					width: '*',
					stack: [
						// { text: '29000.00' },
						// { text: '-9993.30' },
						// { text: '-500.00' },
						// { text: '670.00' },
						// { text: '18670.70', style: 'bigger' },
						// { text: '18000.00', style: 'bigger' },
						// { text: '670.70', style: 'bigger' }
					],
				}]
			}]
		},
		{
			stack: [
				{ text: 'Invoice Note', style: 'bigger' },
				{ text: 'terms and conditions', margin: [0, 10, 0, 10] },
				{
					ol: [
						' the 1500s, wg release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including version',
						' and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolve',
						'e majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to us',
						'sher dhgtjd srfsegfs rdhtrgd hdrghdr',
						'dfs sufhs fesufh esf se ef',
						'sgf sdfdsfsd sdf df sd fd fsd fds fdsdsf d fsdf d '
					]
				}
			],
		},

	],
	styles: {
		header: {
			fontSize: 20,
			bold: true
		},
		bigger: {
			fontSize: 13,
			bold: true,
			margin: [0, 10, 0, 0]
		},
		mt2: {
			margin: [0, 20, 0, 0]
		},
		mt1: {
			margin: [0, 10, 0, 0]
		}
	},
	defaultStyle: {
		columnGap: 30
	}

}

function insertVariableFields(businessName, addressLine1, addressLine2, pin, city, state, taxId, invPrefix, userName, productDescription, productAmount, couponName, couponAmount, gstPercentage, gstAmount, totalAmount, paidToDate, balance, additionalDiscountAmount) {
	docDefinition.content[1].columns[0].stack.push(businessName);
	if (addressLine1) {
		docDefinition.content[1].columns[0].stack.push(addressLine1);
	}
	if (addressLine2) {
		docDefinition.content[1].columns[0].stack.push(addressLine2);
	}
	if (city && state && pin) {
		docDefinition.content[1].columns[0].stack.push(city + ', ' + state + ', ' + pin);
	}
	if (taxId) {
		docDefinition.content[1].columns[0].stack.push('TaxID: ' + taxId);
	}
	// FIXME: necessary for showing 'To' field
	const wordTo = { text: 'To', style: 'bigger' };
	docDefinition.content[1].columns[0].stack.push(wordTo);

	if (userName) {
		docDefinition.content[1].columns[0].stack.push(userName);
		docDefinition.content[1].columns[0].stack.push('India');
	}

	if (userName) {
		docDefinition.content[1].columns[1].stack[1] = invPrefix;
	}

	if (userName) {
		const today = new Date();
		const date = today.getDate();
		docDefinition.content[1].columns[1].stack[3] = date;
	}


	if (productDescription) {
		docDefinition.content[2].table.body[1][0] = productDescription;
	}

	if (productAmount) {
		docDefinition.content[2].table.body[1][1] = productAmount + '';
		docDefinition.content[3].columns[1].columns[1].stack.push(productAmount + '');
	}

	if (couponName && couponAmount) {
		const couponNameObj = { text: `${couponName} (${couponAmount})` };
		docDefinition.content[3].columns[1].columns[0].stack.push(couponNameObj);

		docDefinition.content[3].columns[1].columns[1].stack.push('-' + couponAmount);
	}

	if (additionalDiscountAmount) {
		const additionalDiscountObj = { text: 'Additional Discount' };
		docDefinition.content[3].columns[1].columns[0].stack.push(additionalDiscountObj);

		docDefinition.content[3].columns[1].columns[1].stack.push('-' + additionalDiscountAmount);
	}

	if (gstPercentage && gstAmount) {
		const additionalDiscountObj = { text: `GST (${gstPercentage})` };
		docDefinition.content[3].columns[1].columns[0].stack.push(additionalDiscountObj);

		docDefinition.content[3].columns[1].columns[1].stack.push('' + gstAmount);
	}

	if (totalAmount) {
		const textObj = { text: 'Total', style: 'bigger' };
		docDefinition.content[3].columns[1].columns[0].stack.push(textObj);

		const amountObj = { text: '' + totalAmount, style: 'bigger' };
		docDefinition.content[3].columns[1].columns[1].stack.push(amountObj);
	}

	if (paidToDate) {
		const textObj = { text: 'Paid To Date', style: 'bigger' };
		docDefinition.content[3].columns[1].columns[0].stack.push(textObj);

		const amountObj = { text: '' + paidToDate, style: 'bigger' };
		docDefinition.content[3].columns[1].columns[1].stack.push(amountObj);
	}

	if (true) {
		const textObj = { text: 'Balance', style: 'bigger' };
		docDefinition.content[3].columns[1].columns[0].stack.push(textObj);

		const amountObj = { text: '' + balance, style: 'bigger' };
		docDefinition.content[3].columns[1].columns[1].stack.push(amountObj);
	}
}

function testRun() {
	insertVariableFields('Brain Lab', '3320 sector 23', undefined, 127021, 'gurgaon', 'haryana', 3232323234, 'inv5', 'Rahul', 'JEE Test Series', 1200, '5OFF', 45, 18, 56, 1000, 1000, 0, undefined);
}

testRun();


function downloadPDF() {
	pdfMake.createPdf(docDefinition).download('receipt.pdf');
}
