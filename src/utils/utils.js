// const headers = {
// 	Accept: 'application/json',
// 	'Content-type': 'application/json',
// 	'X-User-Email': 'api@hermandadtrespotencias.com',
// 	'X-User-Token': '9exrqgKSyK4y8PHDrQRD'
// };
// const PREFIX_ENDPOINT = `https://gatsby-turnos.netlify.com/.netlify/functions/`

// const ENDPOINTS = {
// 	tiposDeTurno: `${PREFIX_ENDPOINT}tiposDeTurno`,
// 	turnosNoVendidos: `${PREFIX_ENDPOINT}turnosNoVendidos`,
// 	turnosVendidos: `${PREFIX_ENDPOINT}turnosVendidos`,

// }

// const URLS = {
// 	tiposDeTurno: `https://zauru.herokuapp.com/settings/agencies.json`,
// 	turnosNoVendidos: `https://zauru.herokuapp.com/inventories/stocks.json?warehouse=2505`,
// 	turnosVendidos: `https://zauru.herokuapp.com/sales/reports/sold_active_items_with_clients.json?point_of_sale_id=2505`
// };

const headers = {
	Accept: 'application/json',
	'Content-type': 'application/json',
	'X-User-Email': process.env.GATSBY_EMAIL,
	'X-User-Token': process.env.GATSBY_TOKEN
};
const ENDPOINTS = {
	tiposDeTurno: process.env.GATSBY_URL_TIPOS_DE_TURNO,
	turnosNoVendidos: process.env.GATSBY_URL_TURNOS_NO_VENDIDOS,
	turnosVendidos: process.env.GATSBY_URL_TURNOS_VENDIDOS
};

const URLS = {
	tiposDeTurno: process.env.GATSBY_ENDPOINT_TIPOS_DE_TURNO,
	turnosNoVendidos: process.env.GATSBY_ENDPOINT_TURNOS_NO_VENDIDOS,
	turnosVendidos: process.env.GATSBY_ENDPOINT_TURNOS_VENDIDOS
};

export { headers, URLS, ENDPOINTS };
