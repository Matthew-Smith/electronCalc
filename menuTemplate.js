module.exports = function (app) {
    return [
        {
            label: 'File',
            submenu: [
                {
                    label: 'History',
                    click() {

                    }
                },
                {type: 'separator'},
                {
                    label: 'Exit',
                    click: () => app.exit(0)
                }
            ]
        }
    ];
};
