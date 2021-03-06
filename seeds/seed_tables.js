// knex seed file
// adds test data to the database (including the admin user)

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('t_account').del()
        .then(function() {
            return knex('t_account').insert([
                {
                    id: 1,
                    name: 'admin',
                    salt: 'f86ea46b',
                    password: '813c501417cca3661e9e5419571010361b9af5ffa99b0dac0346643bc29fffd9270ba3f4d088226787c925d4dbf8da36245a71ea760714d77942647f4d861fbe',
                    contact_name: 'Vorname Nachname',
                    email: 'ibc.job.portal@gmail.com',
                    contact_phone: '01020304',
                    company_type: 'ibc',
                    status: 'accepted',
                    admin: true
                },
                {
                    id: 2,
                    name: 'user1',
                    salt: 'f86ea46b',
                    password: '813c501417cca3661e9e5419571010361b9af5ffa99b0dac0346643bc29fffd9270ba3f4d088226787c925d4dbf8da36245a71ea760714d77942647f4d861fbe',
                    contact_name: 'Rainer Wittmann',
                    email: 'r-wittmann@gmx.net',
                    contact_phone: '10203040',
                    company_type: 'ibc',
                    status: 'accepted',
                    admin: false
                }
            ]);
        }).then(function() {
            let accounts = [];
            for (let i = 3; i < 20; i++) {
                accounts.push({
                    id: i,
                    name: 'user' + i,
                    salt: 'f86ea46b',
                    password: '813c501417cca3661e9e5419571010361b9af5ffa99b0dac0346643bc29fffd9270ba3f4d088226787c925d4dbf8da36245a71ea760714d77942647f4d861fbe',
                    contact_name: 'Vorname Nachname',
                    email: 'ibc.job.portal@gmail.de',
                    contact_phone: '1234567',
                    company_type: i < 9 ? 'ibc' : i < 14 ? 'startup' : 'ngo',
                    status: i % 3 === 0 ? 'accepted' : i % 3 === 1 ? 'declined' : 'registered',
                    admin: false
                });
            }
            return knex('t_account').insert(accounts);
        }).then(function() {
            return knex('t_company').insert([
                {
                    id: 1,
                    account_id: 2,
                    company_name: 'Hubert Burda Media',
                    munich_address: 'Biberger Straße 9a\n82008 Unterhaching',
                    locations: 'Leipzig, Transilvanien, Proxima Centauri b',
                    employees: '5',
                    website: 'http://www.burda.de',
                    kununu: 'http://www.kununu.de/hubert_burda_media',
                    field_of_activity: 'Medien',
                    logo: '',
                    company_description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"Farbenfrohe Testbeschreibung \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"color-rgb(44,130,201)\"},{\"offset\":12,\"length\":4,\"style\":\"color-rgb(226,80,65)\"},{\"offset\":16,\"length\":13,\"style\":\"color-rgb(65,168,95)\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"d0je4\",\"text\":\"mit\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":3,\"style\":\"color-rgb(44,130,201)\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"89nva\",\"text\":\"einer\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"color-rgb(226,80,65)\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2862b\",\"text\":\"Liste\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"color-rgb(65,168,95)\"}],\"entityRanges\":[],\"data\":{}}]}"
                },
                {
                    id: 2,
                    account_id: 2,
                    company_name: 'Xing',
                    munich_address: 'Biberger Straße 9a, 82008 Unterhaching',
                    locations: '',
                    employees: '1',
                    website: 'http://www.xing.de',
                    kununu: '',
                    field_of_activity: 'Social Network',
                    logo: undefined,
                    company_description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}"
                }
            ]);
        }).then(function() {
            let companies = [];
            for (let i = 3; i < 20; i++) {
                companies.push({
                        id: i,
                        account_id: i,
                        company_name: 'company' + i,
                        munich_address: 'Biberger Straße 9a, 82008 Unterhaching',
                        locations: '',
                        employees: '1',
                        website: 'http://www.company.de',
                        kununu: '',
                        field_of_activity: 'Unternehmen beraten',
                        logo: undefined,
                        company_description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}"
                });
            }
            return knex('t_company').insert(companies);
        }).then(function() {
            return knex('t_recruiter').insert([
                {
                    id: 1,
                    account_id: 2,
                    recruiter_name: 'Rainer Wittmann',
                    recruiter_email: 'r-wittmann@gmx.net',
                    phone: '000000',
                    mobile: '000001',
                    position: 'Werkstudent',
                    location: 'München',
                    photo: '',
                    xing: 'http://xing.de/rainer',
                    linked_in: 'http://linkedin.de/rainer'
                }
            ]);
        }).then(function() {

            let now = new Date();
            let dayAfterTomorrow = new Date();
            dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

            return knex('t_posting').insert([
                {
                    id: 20,
                    account_id: 2,
                    company_id: 1,
                    recruiter_id: 1,
                    title: 'Werkstudentenstelle Digitales Marketing',
                    start_of_employment: 'Ab Sofort',
                    contract_type: 'Werkstudent',
                    contract_duration: '6',
                    working_hours: '20h/Woche',
                    entry_level: 'Studenten',
                    place_of_employment: 'München',
                    application_link: 'http://www.application.link',
                    field_of_employment: 'marketing',
                    pdf: false,
                    status: 'active',
                    description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}",
                    expiry_date: now.toISOString()
                },
                {
                    id: 21,
                    account_id: 2,
                    company_id: 1,
                    recruiter_id: 1,
                    title: 'Direkteinstieg Digitales Marketing',
                    start_of_employment: 'Nach Vereinbarung',
                    contract_type: 'Direkteinstieg',
                    contract_duration: 'indefinite',
                    working_hours: 'Vollzeit',
                    entry_level: 'Absolventen',
                    place_of_employment: 'München',
                    application_link: 'http://www.application.link',
                    field_of_employment: 'marketing',
                    pdf: false,
                    status: 'active',
                    description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}",
                    expiry_date: dayAfterTomorrow.toISOString()
                },
                {
                    id: 22,
                    account_id: 2,
                    company_id: 2,
                    recruiter_id: 1,
                    title: 'Direkteinstieg Digitales Marketing',
                    start_of_employment: 'Ab Sofort',
                    contract_type: 'Direkteinstieg',
                    contract_duration: 'indefinite',
                    working_hours: 'Vollzeit',
                    entry_level: 'Absolventen',
                    place_of_employment: 'München',
                    application_link: 'http://www.application.link',
                    field_of_employment: 'marketing',
                    pdf: false,
                    status: 'deactivated',
                    description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}",
                    expiry_date: ''
                }
            ]);
        }).then(function() {
            let postings = [];
            for (let i = 1; i < 20; i++) {
                postings.push({
                    id: i,
                    account_id: 2,
                    company_id: 2,
                    recruiter_id: 1,
                    title: 'example posting',
                    start_of_employment: 'Nach Vereinbarung',
                    contract_type: 'Direkteinstieg',
                    contract_duration: 'indefinite',
                    working_hours: 'Vollzeit',
                    entry_level: 'Absolventen',
                    place_of_employment: 'München',
                    application_link: 'http://www.application.link',
                    field_of_employment: 'itDev',
                    pdf: false,
                    status: 'deactivated',
                    description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}",
                    expiry_date: ''
                });
            }
            return knex('t_posting').insert(postings);
        });
};
