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
                    mother_company: 'IBC',
                    email: 'ibc.job.portal@gmail.com',
                    company_type: 'ibc',
                    status: 'accepted',
                    admin: true
                },
                {
                    id: 2,
                    name: 'user1',
                    salt: 'f86ea46b',
                    password: '813c501417cca3661e9e5419571010361b9af5ffa99b0dac0346643bc29fffd9270ba3f4d088226787c925d4dbf8da36245a71ea760714d77942647f4d861fbe',
                    mother_company: 'Hubert Burda',
                    email: 'r-wittmann@gmx.net',
                    company_type: 'ibc',
                    status: 'accepted',
                    admin: false
                },
                {
                    id: 3,
                    name: 'user2',
                    salt: 'f86ea46b',
                    password: '813c501417cca3661e9e5419571010361b9af5ffa99b0dac0346643bc29fffd9270ba3f4d088226787c925d4dbf8da36245a71ea760714d77942647f4d861fbe',
                    mother_company: 'Sapient Razorfish',
                    email: 'r-wittmann@gmx.net',
                    company_type: 'ibc',
                    status: 'registered',
                    admin: false
                },
                {
                    id: 4,
                    name: 'user3',
                    salt: 'f86ea46b',
                    password: '813c501417cca3661e9e5419571010361b9af5ffa99b0dac0346643bc29fffd9270ba3f4d088226787c925d4dbf8da36245a71ea760714d77942647f4d861fbe',
                    mother_company: 'BMW',
                    email: 'r-wittmann@gmx.net',
                    company_type: 'startup',
                    status: 'declined',
                    admin: false
                }
            ]);
        }).then(function() {
            return knex('t_company').insert([
                {
                    id: 1,
                    account_id: 2,
                    company_name: 'Hubert Burda Media',
                    contact_name: 'Ray',
                    contact_email: 'r-wittmann@gmx.net',
                    contact_phone: '017683268379',
                    munich_address: 'Biberger Straße 9a, 82008 Unterhaching',
                    locations: '',
                    employees: '1',
                    website: 'www.burda.de',
                    kununu: '',
                    field_of_activity: 'Media',
                    logo: undefined,
                    company_description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}"
                },
                {
                    id: 2,
                    account_id: 2,
                    company_name: 'Xing',
                    contact_name: 'Ray',
                    contact_email: 'r-wittmann@gmx.net',
                    contact_phone: '017683268379',
                    munich_address: 'Biberger Straße 9a, 82008 Unterhaching',
                    locations: '',
                    employees: '1',
                    website: 'www.xing.de',
                    kununu: '',
                    field_of_activity: 'Social Network',
                    logo: undefined,
                    company_description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}"
                },
                {
                    id: 3,
                    account_id: 3,
                    company_name: 'Sapient Razorfish',
                    contact_name: 'Ray',
                    contact_email: 'r-wittmann@gmx.net',
                    contact_phone: '017683268379',
                    munich_address: 'Biberger Straße 9a, 82008 Unterhaching',
                    locations: '',
                    employees: '1',
                    website: 'www.sapient.de',
                    kununu: '',
                    field_of_activity: 'Unternehmen beraten',
                    logo: undefined,
                    company_description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}"
                },
                {
                    id: 4,
                    account_id: 4,
                    company_name: 'BMW',
                    contact_name: 'Ray',
                    contact_email: 'r-wittmann@gmx.net',
                    contact_phone: '017683268379',
                    munich_address: 'Biberger Straße 9a, 82008 Unterhaching',
                    locations: '',
                    employees: '1',
                    website: 'www.bmw.de',
                    kununu: '',
                    field_of_activity: 'Autos bauen',
                    logo: undefined,
                    company_description: "{\"entityMap\":{},\"blocks\":[{\"key\":\"1hf1m\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}"
                }
            ])
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
                    xing: 'xing.de/rainer',
                    linked_in: 'linkedin.de/rainer'
                }
            ])
        });
};
