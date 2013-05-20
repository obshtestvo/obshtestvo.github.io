(function ($) {

    $.fn.mediaChapter = function (options) {
        // create object to store variables
        var defaults = {
            audioElementSelector: '.audio', // Default audio player that will load the audio file
            audioChapterSelector: '.loader' // Default element that will have the data-timestamp for the chapter
        };
		options = $.extend({}, defaults, options);
		var $audio = $(options.audioElementSelector)

        $(this).each(function () {
            var $el = $(this);
            // Click on the specified element to load .mp3 into audio tag
            var path = $el.data('recording');
            $el.on('click', function () {
                // Load the audio file for the selected episode
				$audio.attr({
					src: path
				});
                return false;
            });


			var $chapters = $el.find(options.audioChapterSelector);
			console.log($chapters);
			// Click on Segment, Set timestamp in audioplayer - autoplay
			$chapters.on('click', function () {
				var timestamp = $(this).data('timestamp').split(':'),
					minutes = parseInt(timestamp[0] * 60, 10),
					seconds = parseInt(timestamp[1], 10);

				// Give the audio player the timestamp of the segment
				console.log($audio.get(0))
				$audio.get(0).currentTime = minutes + seconds
				$audio.get(0).play();

				return false;
			});
        })

        return this;

    };

})(jQuery);