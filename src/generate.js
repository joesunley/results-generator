function generateFile(title, imgUrl, color, json) {
            const results = generateResults(JSON.parse(json));

            const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="https://res.sunley.uk/sunley/results-style.css" rel="stylesheet" type="text/css">
    <style>
:root {
    --text: ${color};
    --btnbackground: ${color};
    --btntext: white;
    </style>
</head>
<body>
    <div class="title">
        <a>
            <img class="logo" src="${imgUrl}" alt="Event Logo">
        </a>
    </div>
    <div class="row">
        ${results}
    </div>
</body>
</html>`;

            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'results.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showMessage("Success! Your file has been generated.", "bg-green-100 text-green-700");
        }

        function generateResults(json) {
            let html = '';

            json.events.forEach(event => {
                html += `<div class="column">\n`;
                html += `<h2>${event.title}</h2>\n`;
                html += `<div class="buttons">\n`;

                event.results.forEach((result, index) => {
                    const isLastItem = index === event.results.length - 1;

                    if (result.text) {
                        if (result.link) {
                            html += `<a href="${result.link}" class="btn active${!isLastItem ? ' spacer' : ''}">${result.text}</a>\n`;
                        } else {
                            html += `<a class="btn${!isLastItem ? ' spacer' : ''}">${result.text}</a>\n`;
                        }
                    } else if (result.group) {
                        html += `<div class="sidebyside spacer">`;
                        result.group.forEach(groupItem => {
                            if (groupItem.link) {
                                html += `<a href="${groupItem.link}" class="btn active">${groupItem.text}</a>`;
                            } else {
                                html += `<a class="btn">${groupItem.text}</a>`;
                            }
                        });
                        html += `</div>`;
                    }
                });

                html += `</div>`;
                html += `</div>`;
            });

            return html;
        }