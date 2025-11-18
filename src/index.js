import './css/index.css';
import { customTooltip } from './custom.js';

document.addEventListener('DOMContentLoaded', function(event){
	const { Studio } = window;
	const { id = 'AXBR6sWIAAA2ac12AAAA' } = Studio._.urlParamObj();

	const config = {
		map: id,
		mapworksPath: 'https://app.mapworks.io',
		access: Studio.core.Map.Access.ANONYMOUS,
		navigationControl: false,
		scaleControl: true,
		toolbarControl: true,
		zoomControl: false,
		downloadUserSettings: false,
		mapworksLoginProvider: {
			client_id: '3mvor82v8k8f6nbi4f8bpihsom',
			popup_redirect_uri: 'http://localhost:8080/openId.html',
			anonymousUser: 'noreply@public-anonymous.mapworks.io',
		}
	}

	const map = window.map = Studio.init('#embed1', config)
	.once('ready', function(){
		customTooltip(map);
	});
});
