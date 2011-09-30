var instagramControl = (function () {

    var elements = {},
        values = {},
        getInstaImages = function (url) {
            // window.log(values.currentPage);
            if (values.currentPage === 0) {
                values.prevUrls[0] = '';
                els.prev.css('visibility', 'hidden');
            } else {
                els.prev.css('visibility', 'visible');
            }
            els.prev.unbind('click');
            els.prev.bind('click', function (e) {
                values.currentPage--;
                getInstaImages(values.prevUrls[values.currentPage]);
            });
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: url,
                success: function (data) {

                    els.container.html('');
                    if (data.data.length > 0) {
                        $.each(data.data, function (key, value) {
                            // console.log(value);
                            var url = value.images.thumbnail.url;
                            els.container.append("<li><a href='"+value.link+"' target='_blank'><img src='" + url + "' width='75' height='75' alt=''/></a></li>");
                        });
                        if (typeof data.pagination.next_url !== 'undefined') {
                            els.next.show();
                            els.next.unbind('click');
                            els.next.bind('click', { url: data.pagination.next_url, prevUrl: url }, function (e) {
                                values.currentPage++;
                                values.prevUrls[values.currentPage] = url;
                                getInstaImages(e.data.url);

                            })
                        } else {
                            els.next.hide();
                        }
                    } else {
                        els.container.html(values.errorString);
                    }
                    $('#instagram').show();
                    //pageResize.resize();
                }
            });

        },
        paginate = function () {

        },

    init = function (count) {
        els = {
            container: $("#instagramList"),
            next: $('#nextBtn'),
            prev: $('#prevBtn')
        };
        values = {
            key: '{INSERT_KEY_HERE}',
            url: "https://api.instagram.com/v1/tags/{YOUR_KEYWORD}/media/recent?client_id={INSERT_KEY_HERE}&count="+count,
            defaultSearch: "{YOUR_KEYWORD}",
            errorString: "<li>No results were found</li>",
            prevUrls: [],
            currentPage: 0
        };

        getInstaImages(values.url)

    };

    return {
        init: init
    };

} ());