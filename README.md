"#osa5" 
	5.1-5.15 (bloglista)
	frontend => "npm start" osa5.1-5.15/frontend kansiossa
	backend => "npm run watch" root kansiossa (ei toimi npm startilla nykyisellä setupilla, koska MONGODB_URI/URLN määrittely pielessä silloin. Saattaa toimia, kunhan määrittelet utils/config.js && .env fileen omat MONGODB_URI/URLIT.)
	.env fileen root-kansioon on piilotettu SECRET ja MONGODB_URL, PORT, TEST_PORT ja TEST_MONGODB_URL.
	.env fileen /frontend kansioon on piilotettu SKIP_PREFLIGHT_CHECK=true , sillä joku virhe eslint-dependencyssä estää frontendin käynnistämisen muutoin.

	5.17-5.18 (unicafe)
	frontend => "npm start" root kansiossa

	5.19-5.21 (anekdootit)
	frontend => "npm start" root kansiossa
