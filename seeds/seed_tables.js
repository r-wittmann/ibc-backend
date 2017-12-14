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
                    mother_company: 'mother',
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
                    mother_company: 'mother',
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
                    mother_company: 'mother',
                    email: 'r-wittmann@gmx.net',
                    company_type: 'ibc',
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
                    locations: null,
                    employees: '1',
                    website: 'https://www.github.com/r-wittmann',
                    kununu: null,
                    field_of_activity: 'Software Development',
                    logo: null,
                    company_description: ''
                },
                {
                    id: 2,
                    account_id: 2,
                    company_name: 'Xing',
                    contact_name: 'Ray',
                    contact_email: 'r-wittmann@gmx.net',
                    contact_phone: '017683268379',
                    munich_address: 'Biberger Straße 9a, 82008 Unterhaching',
                    locations: null,
                    employees: '1',
                    website: 'https://www.github.com/r-wittmann',
                    kununu: null,
                    field_of_activity: 'Software Development',
                    logo: null,
                    company_description: ''
                }
            ])
        });
};
