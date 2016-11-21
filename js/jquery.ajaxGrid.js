(function($) {

    var scope = {
        options: {},
        headers: [],
        model: {},
        sortableColumns: null,
        filterableColumns: null,
        rowsWrapper: null,
        gridHeader: null,
        grid: null,
        sortBy: 'asc',
        context: null,
        methods: {
            setContext: function(context) {
                scope.context = context;
            },

            init: function() {
                scope.context.load('grid-template.html');
                this.get(scope.options.dataUrl, {}, function(response) {
                    scope.headers = response.headers;
                    scope.model = response.data;
                    scope.gridHeader = scope.context.children(".grid-header");
                    scope.grid = scope.context.children(".grid");
                    scope.sortableColumns = scope.context.find(".sortable");
                    scope.filterablColumns = scope.context.find(".filterable");
                    scope.methods.updateView();
                });
            },

            sort: function(data) {
                this.get("/api/get-products/", data);
            },

            filter: function(data) {
                this.get("/api/get-products/", data);
            },

            paginate: function(data) {
                this.process("/api/get-products/", data);
            },

            process: function(url, data, callback) {
                this.get(url, data, function(response) {
                    scope.model = data;
                    scope.updateView();
                });
            },

            get: function(url, data, callback) {
                $.ajax({
                    method: "GET",
                    url: url,
                    data: data,
                    success: callback || function(response) {
                        scope.model = data;
                        scope.methods.updateView();
                    }
                });
            },

            updateView: function() {
                var id, name, year, description, img;
                var resultDOM = '',
                    start = Math.round( Math.random() * (scope.model.length-10) );
                for (var i = start; i < start+10; i++) {
                    var row = scope.model[i];
                    resultDOM += '<div class="product col s12 m4 l3 z-depth-2 rounded">';
                    //for(var key in row) {
                        img = '<div class="prod-info image-wrapper"><img src="img/product.png"></div>';
                        id = '<div class="prod-info name-id"><b>'+row['id']+'</b> - '+row['name']+'</div>';
                        description = '<div class="prod-info description">'+row['description']+'</div>'
                        year = '<div class="year"><b> Added '+row['year']+'</b></div>';

                        resultDOM += img+id+description+year;
                    //}
                    resultDOM += '</div>';
                }
                scope.grid.html(resultDOM);
            }
        }
    };

    $.fn.ajaxGrid = function(options) {
        scope.options = options;
        scope.methods.setContext(this);
        scope.methods.init();

        /*scope.sortableColumns.each(function() {
            var current = $(this);
            current.on('click', function() {
                current.toggleClass("asc desc");
            });
        });*/

        return this;
    }

})(jQuery);
