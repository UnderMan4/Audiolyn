/**
 * An FFprobe response chapter object
 */
export type FFprobeChapter = {
   /**
    * When the chapter end in integer timestamp format (defined by time_base)
    */
   end: number;

   /**
    * The string representation of a floating point integer showing when the chapter ends in seconds
    */
   end_time: string;

   /**
    * The chapter ID
    */
   id: number;

   /**
    * When the chapter starts in integer timestamp format (defined by time_base)
    */
   start: number;

   /**
    * The string representation of a floating point integer showing when the chapter starts in seconds
    */
   start_time: string;

   /**
    * The chapter's tags
    */
   tags: FFprobeChapterTags;

   /**
    * The division equation to use for converting integer representations of timestamps into seconds (e.g. "1/30000" turns 80632552 into 2687.751733 seconds)
    */
   time_base: string;
};

/**
/**
 * Chapter-level metadata tags extracted from FFprobe.
 * These fields represent chapter titles in different tagging standards.
 */
export type FFprobeChapterTags = {
   /**
    * Standard chapter title used by MP4, M4B, and ID3 chapter metadata.
    */
   title?: string;

   /**
    * Uppercase variant of the standard chapter title.
    * Appears in some legacy tools.
    */
   TITLE?: string;

   /**
    * iTunes-style metadata atom representing the chapter title
    * in MP4/M4B files.
    */
   "©nam"?: string;

   /**
    * An alternative chapter title field used by some tagging tools
    * and custom chapter editors.
    */
   chapter_title?: string;

   /**
    * Uppercase variant of the alternative chapter title field.
    */
   CHAPTER_TITLE?: string;

   /**
    * A generic name field occasionally used as a chapter title
    * by some older MP4 editors or custom scripts.
    */
   name?: string;

   /**
    * Uppercase variant of the generic name field.
    */
   NAME?: string;
};

/**
 * An FFprobe response format object
 */
export type FFprobeFormat = {
   /**
    * The string representation of a long integer showing the file's stated bitrate (may vary between streams, probably applies to just video if a video file)
    */
   bit_rate: string;

   /**
    * The string representation of a floating point integer showing the file's duration in seconds (seems to be a non-accurate, rounded version of the real duration)
    */
   duration: string;

   /**
    * The path of the probed file (as specified in the input file argument)
    */
   filename: string;

   /**
    * The long (detailed) name of the format
    */
   format_long_name: string;

   /**
    * The name of the format (a comma separated list of applicable file extensions for the format)
    */
   format_name: string;

   /**
    * The total number of programs present
    */
   nb_programs: number;

   /**
    * The total number of streams present
    */
   nb_streams: number;

   /**
    * A score of how confident FFprobe is of the format, 0 to 100. https://stackoverflow.com/questions/25257986/what-does-probe-score-mean-in-ffprobe-output
    */
   probe_score: number;

   /**
    * The string representation of a long integer showing the file's size in bytes
    */
   size: string;

   /**
    * The string representation of a floating point integer showing the file's starting time
    */
   start_time: string;

   /**
    * The format's tags
    */
   tags?: FFprobeFormatTags;
};

/**
 * The "tags" field on an FFprobe response format object
 */
export type FFprobeFormatTags = {
   /**
    * The album (only present in audio files)
    */
   ALBUM?: string;

   /**
    * The album field, often used in audiobooks as the series name or collection name.
    */
   album?: string;

   /**
    * The album artist name used for sorting probably (only present in audio files)
    */
   ALBUMARTISTSORT?: string;

   /**
    * The song artist (only present in audio files)
    */
   ARTIST?: string;

   /**
    * The date when the song was created (no particular format, often the year) (only present in audio files)
    */
   DATE?: string;

   /**
    * The song's genre (only present in audio files)
    */
   GENRE?: string;

   /**
    * The song's publisher (only present in audio files)
    */
   PUBLISHER?: string;

   /**
    * The song's title (only present in audio files)
    */
   TITLE?: string;

   /**
    * The string representation of an integer showing the year the song was created (only present in audio files)
    */
   YEAR?: string;

   /**
    * The album arist (only present in audio files)
    */
   album_artist?: string;

   /**
    * The media artist (song metadata uses an all uppercase version)
    */
   artist?: string;

   /**
    * The comment attached to the file
    */
   comment?: string;

   /**
    * The ISO-formatted date (although it may use other formats) when the media was created
    */
   creation_time?: string;

   /**
    * The media's creation date, seems to be in YYYYMMDD format (song metadata uses an all uppercase version)
    */
   date?: string;

   /**
    * The description attached to the file
    */
   description?: string;

   /**
    * The name of the encoder responsible for encoding the media
    */
   encoder?: string;

   /**
    * The media's title (song metadata uses an all uppercase version)
    */
   title?: string;

   /**
    * The string representation of an integer showing the song's track number (only present in audio files)
    */
   track?: string;
   /**
    * The author of the audiobook
    */
   author?: string;

   /**
    * The narrator or reader of the audiobook
    */
   narrator?: string;

   /**
    * The series the audiobook belongs to
    */
   series?: string;

   /**
    * The book's number or position inside the series
    */
   series_part?: string;

   /**
    * Alternative field used by some tools for the series index
    */
   series_index?: string;

   /**
    * A summary of the audiobook (short description)
    */
   summary?: string;

   /**
    * A long-form description or synopsis
    */
   synopsis?: string;

   /**
    * Custom keywords or tags added by organizer tools
    */
   keywords?: string;

   /**
    * Human-readable runtime stored by some converters (e.g. HH:MM:SS)
    */
   runtime?: string;

   /**
    * The publisher of the audiobook (book metadata, not music "PUBLISHER")
    */
   publisher?: string;

   /**
    * Book number (alternative field used by some apps)
    */
   book_number?: string;

   /**
    * Total number of books in the series
    */
   book_total?: string;

   /**
    * Audible-specific ASIN identifier
    */
   audible_asin?: string;

   /**
    * Audible internal product ID
    */
   audible_product_id?: string;

   /**
    * Uppercase variant of Audible's ASIN identifier used by some metadata tools.
    */
   ASIN?: string;

   /**
    * Lowercase variant of Audible's ASIN identifier used by some converters.
    */
   asin?: string;

   /**
    * Audible-stored title metadata
    */
   audible_title?: string;

   /**
    * Audible-stored author metadata
    */
   audible_author?: string;

   /**
    * Audible-stored narrator metadata
    */
   audible_narrator?: string;

   /**
    * Apple/iTunes-style metadata - title
    */
   "©nam"?: string;

   /**
    * Apple/iTunes-style metadata - artist (often narrator)
    */
   "©ART"?: string;

   /**
    * Apple/iTunes-style metadata - release date
    */
   "©day"?: string;

   /**
    * Apple/iTunes-style metadata - genre
    */
   "©gen"?: string;

   /**
    * The primary language of the audiobook, often stored as a string
    * (ISO 639-1 or textual form).
    */
   language?: string;

   /**
    * Uppercase variant of the language field, usually representing
    * an ISO 639-1 or 639-2 code normalized by some tagging tools.
    */
   LANGUAGE?: string;

   /**
    * Apple/iTunes-style language tag. Can contain ISO codes or
    * textual descriptions depending on the tool that created the file.
    */
   "©lan"?: string;

   /**
    * A generic language field used by some older tools and scripts.
    */
   lang?: string;

   /**
    * Uppercase version of the generic "lang" tag, rarely used.
    */
   LANG?: string;

   /**
    * A comma-separated list of languages used by some user scripts or
    * converters instead of a proper single-language field.
    */
   languages?: string;

   /**
    * Lowercase genre field used by some modern tools and MP4/M4B metadata editors.
    */
   genre?: string;

   /**
    * Genre extracted from Audible metadata during AAX conversion.
    * Rare, but may appear in some user-produced files.
    */
   audible_genre?: string;

   /**
    * The International Standard Book Number associated with the audiobook.
    */
   isbn?: string;

   /**
    * Uppercase variant of the ISBN tag used by some metadata tools.
    */
   ISBN?: string;

   /**
    * A book identifier used by some audiobook tagging tools; may contain an ISBN.
    */
   book_id?: string;

   /**
    * Lowercase variant of a book identifier field, sometimes containing an ISBN.
    */
   bookid?: string;

   /**
    * A generic identifier field based on Dublin Core metadata; may store an ISBN.
    */
   identifier?: string;

   /**
    * Uppercase variant of the generic identifier field.
    */
   IDENTIFIER?: string;

   /**
    * Uppercase variant of the description field, usually originating
    * from older ID3 tagging tools or automated scripts.
    */
   DESCRIPTION?: string;

   /**
    * Uppercase variant of the comment field, commonly generated by
    * older ID3 or MP3 metadata editors.
    */
   COMMENT?: string;

   /**
    * A narrative description extracted from Audible AAX metadata.
    * Rare, but may appear in some conversion pipelines.
    */
   audible_description?: string;

   /**
    * Uppercase variant of the synopsis field, produced by older tools
    * or scripts that convert all tag names to uppercase.
    */
   SYNOPSIS?: string;

   /**
    * A numeric or string release year, commonly used in MP3 metadata.
    */
   year?: string;

   /**
    * Release date of the audiobook stored by some tagging scripts
    * or metadata editors, often in YYYY-MM-DD format.
    */
   release_date?: string;

   /**
    * Alternative release date tag used by some user-generated metadata
    * or casual tagging tools.
    */
   released?: string;

   /**
    * Publication date, used by book-oriented tagging tools,
    * Calibre plugins, or audiobook converters.
    */
   publication_date?: string;

   /**
    * Short publication date tag used by some metadata utilities
    * and book import scripts.
    */
   pubdate?: string;

   /**
    * Release date extracted from Audible AAX metadata.
    * Rare but appears in some conversion workflows.
    */
   audible_release_date?: string;

   /**
    * Publisher metadata extracted from Audible AAX files, if present.
    * Not always included but useful as a fallback.
    */
   audible_publisher?: string;

   /**
    * Uppercase variant of the "series" tag used by some metadata tools.
    */
   SERIES?: string;

   /**
    * Alternative field used by some tagging tools for the series name.
    */
   series_name?: string;

   /**
    * Uppercase variant of the "series_name" tag.
    */
   SERIES_NAME?: string;

   /**
    * Another alternative field representing the series name or title
    * used by certain conversion scripts or tag editors.
    */
   series_title?: string;

   /**
    * Uppercase variant of the "series_title" tag.
    */
   SERIES_TITLE?: string;

   /**
    * iTunes-style album atom, frequently used to store the series name
    * in M4B/MP4 audiobook files.
    */
   "©alb"?: string;

   /**
    * Series name stored in book-oriented metadata formats or Calibre exports.
    */
   book_series?: string;

   /**
    * Uppercase variant of the book_series tag.
    */
   BOOK_SERIES?: string;

   /**
    * Uppercase variant of series_part.
    */
   SERIES_PART?: string;

   /**
    * Uppercase variant of series_index.
    */
   SERIES_INDEX?: string;

   /**
    * Another naming variant for the number in a series.
    */
   series_number?: string;

   /**
    * Uppercase variant of series_number.
    */
   SERIES_NUMBER?: string;

   /**
    * Uppercase variant of book_number.
    */
   BOOK_NUMBER?: string;

   /**
    * Generic field used by some tagging tools
    * for series index.
    */
   number_in_series?: string;

   /**
    * Uppercase variant of number_in_series.
    */
   NUMBER_IN_SERIES?: string;

   /**
    * A generic "part" tag, sometimes used to represent
    * the audiobook's order in the series.
    */
   part?: string;

   /**
    * Uppercase variant of part.
    */
   PART?: string;

   /**
    * Uppercase variant of track.
    */
   TRACK?: string;

   /**
    * iTunes-style episode/part number atom.
    * Rare but exists in MP4/M4B files.
    */
   "©tvs"?: string;

   /**
    * Subtitle of the series — for example,
    * "The Dresden Files: A Novel of Magic and Mystery".
    */
   series_subtitle?: string;

   /**
    * Uppercase variant of series_subtitle.
    */
   SERIES_SUBTITLE?: string;

   /**
    * A generic subtitle field often used by MP4/M4B editors or
    * user tagging tools to store additional series information.
    */
   subtitle?: string;

   /**
    * Uppercase variant of subtitle.
    */
   SUBTITLE?: string;

   /**
    * Subseries name or subtitle used by some Calibre plugins
    * and book-oriented metadata tools.
    */
   subseries?: string;

   /**
    * Uppercase variant of subseries.
    */
   SUBSERIES?: string;

   /**
    * Series description or extended subtitle, used by a few
    * custom tagging workflows.
    */
   series_description?: string;

   /**
    * Uppercase variant of series_description.
    */
   SERIES_DESCRIPTION?: string;

   /**
    * iTunes-style secondary/title-subtitle atom sometimes used
    * to store the subtitle or part-title of a series.
    */
   "©sst"?: string;

   /**
    * Uppercase variant of the narrator field.
    */
   NARRATOR?: string;

   /**
    * Generic performer field often misused as the narrator field.
    * Present in some MP3/M4B tagging tools.
    */
   performer?: string;

   /**
    * Uppercase variant of performer.
    */
   PERFORMER?: string;

   /**
    * Alternative narrator field used by some book-oriented metadata
    * tools and Calibre plugins.
    */
   reader?: string;

   /**
    * Uppercase variant of reader.
    */
   READER?: string;

   /**
    * Audible sometimes puts narrator information incorrectly
    * into the composer metadata field.
    */
   composer?: string;

   /**
    * Uppercase variant of composer.
    */
   COMPOSER?: string;

   /**
    * iTunes/MP4 atom specifically intended for narrators.
    * Rare but valid and supported by some tools.
    */
   "©nrt"?: string;

   /**
    * Another Audible-derived field sometimes containing narrator
    * information in certain conversion pipelines.
    */
   audible_reader?: string;

   /**
    * Audible-specific field sometimes used to represent the performer
    * (often the narrator).
    */
   audible_performer?: string;
};

/**
 * An FFprobe error object
 */
export type FFprobeProbeError = {
   /**
    * The error code
    */
   code: number;

   /**
    * The error message
    */
   string: string;
};

/**
 * An FFprobe response stream object
 */
export type FFprobeStream = {
   /**
    * Odd formatting of the average frame rate (e.g. "30/1")
    */
   avg_frame_rate: string;

   /**
    * The string representation of an integer showing the stream bit rate (not present on lossless formats such as FLAC)
    */
   bit_rate?: string;

   /**
    * A string representation of an integer showing the bits per raw sample (not present if codec_type is not "video")
    */
   bits_per_raw_sample?: string;

   /**
    * Bits per audio sample (might not be accurate, may just be 0) (not present if codec_type is not "audio")
    */
   bits_per_sample?: number;

   /**
    * The audio track's channel layout (e.g. "stereo") (not present if codec_type is not "audio")
    */
   channel_layout?: "stereo" | "mono";

   /**
    * The audio track's channel count (not present if codec_type is not "audio")
    */
   channels?: number;

   /**
    * The chroma location (not present if codec_type is not "video")
    */
   chroma_location?: string;

   /**
    * Set to 1 if closed captions are present in stream... I think (not present if codec_type is not "video")
    */
   closed_captions?: 1 | 0 | number;

   /**
    * The codec's long (detailed) name
    */
   codec_long_name: string;

   /**
    * The codec's name
    */
   codec_name: string;

   /**
    * The codec tag ID
    */
   codec_tag: string;

   /**
    * The codec tag (technical name)
    */
   codec_tag_string: string;

   /**
    * The type of codec (video, audio, subtitle, etc.)
    */
   codec_type: "video" | "audio" | "subtitle";

   /**
    * The stream's coded height (shouldn't vary from "height") (not present if codec_type is not "video")
    */
   coded_height?: number;

   /**
    * The stream's coded width (shouldn't vary from "width") (not present if codec_type is not "video")
    */
   coded_width?: number;

   /**
    * The color primaries used (not present if codec_type is not "video")
    */
   color_primaries?: string;

   /**
    * The color range used (e.g. "tv") (not present if codec_type is not "video")
    */
   color_range?: string;

   /**
    * The color space used (not present if codec_type is not "video")
    */
   color_space?: string;

   /**
    * The color transfer used (not present if codec_type is not "video")
    */
   color_transfer?: string;

   /**
    * The display (real) aspect ratio (e.g. "16:9") (not present if codec_type is not "video")
    */
   display_aspect_ratio?: string;

   /**
    * The stream's disposition
    */
   disposition: FFprobeStreamDisposition;

   /**
    * A string representation of a floating point integer showing the stream duration in seconds
    */
   duration: string;

   /**
    * The stream's duration in integer timestamp format (defined by time_base)
    */
   duration_ts: number;

   /**
    * Set to 1 if the stream has b-frames... I think (not present if codec_type is not "video")
    */
   has_b_frames?: 1 | 0 | number;

   /**
    * The stream height (also available for images) (not present if codec_type is not "video")
    */
   height?: number;

   /**
    * The stream index
    */
   index: number;

   /**
    * Whether the stream is AVC (not present if codec_type is not "video")
    */
   is_avc?: "true" | "false";

   /**
    * Unknown (not present if codec_type is not "video")
    */
   level?: number;

   /**
    * Unknown string representing a number (not present if codec_type is not "video")
    */
   nal_length_size?: string;

   /**
    * A string representation of an integer showing the total number of frames in the stream
    */
   nb_frames: string;

   /**
    * The pixel format used (not present if codec_type is not "video")
    */
   pix_fmt?: string;

   /**
    * The codec profile
    */
   profile: string;

   /**
    * Odd formatting of the frame rate, possibly "real frame rate"? (e.g. "30/1")
    */
   r_frame_rate: string;

   /**
    * Unknown (not present if codec_type is not "video")
    */
   refs?: number;

   /**
    * The sample aspect ratio (you probably want "display_aspect_ratio") (not present if codec_type is not "video")
    */
   sample_aspect_ratio?: string;

   /**
    * The audio sample format (not present if codec_type is not "audio")
    */
   sample_fmt?: string;

   /**
    * A string representation of an integer showing the audio sample rate (not present if codec_type is not "audio")
    */
   sample_rate?: string;

   /**
    * Unknown
    */
   start_pts: number;

   /**
    * A string representation of a floating point integer showing the start time in seconds
    */
   start_time: string;

   /**
    * The stream's tags
    */
   tags?: FFprobeStreamTags;

   /**
    * The division equation to use for converting integer representations of timestamps into seconds (e.g. "1/30000" turns 80632552 into 2687.751733 seconds)
    */
   time_base: string;

   /**
    * The video stream width (also available for images) (not present if codec_type is not "video")
    */
   width?: number;

   /**
    * FFmpeg-normalized language code for this audio stream.
    * Derived from MP4 (mdhd/elng) or ID3 (TLAN) metadata.
    * Typically ISO 639-1 or 639-2 (e.g. "en", "eng", "pl").
    */
   language?: string;
};

export type FFprobeStreamDisposition = {
   /**
    * 1 if an attached picture track
    */
   attached_pic: 1 | 0;

   /**
    * 1 if a captions track
    */
   captions: 1 | 0;

   /**
    * 1 if a clean effects track
    */
   clean_effects: 1 | 0;

   /**
    * 1 if a comment track
    */
   comment: 1 | 0;

   /**
    * 1 if the default track
    */
   default: 1 | 0;

   /**
    * 1 if a dependent track (unclear meaning)
    */
   dependent: 1 | 0;

   /**
    * 1 if a descriptions track
    */
   descriptions: 1 | 0;

   /**
    * 1 if a dub track
    */
   dub: 1 | 0;

   /**
    * 1 if a forced track
    */
   forced: 1 | 0;

   /**
    * 1 if a track for the hearing impaired
    */
   hearing_impaired: 1 | 0;

   /**
    * 1 if a karaoke track
    */
   karaoke: 1 | 0;

   /**
    * 1 if a lyrics track
    */
   lyrics: 1 | 0;

   /**
    * 1 if a metadata track
    */
   metadata: 1 | 0;

   /**
    * 1 if the original track
    */
   original: 1 | 0;

   /**
    * 1 if a still image track
    */
   still_image: 1 | 0;

   /**
    * 1 if a timed thumbnails track (perhaps like the preview thumbnails you get when scrolling over a YouTube video's seek bar)
    */
   timed_thumbnails: 1 | 0;

   /**
    * 1 if a track for the visually impaired
    */
   visual_impaired: 1 | 0;
};

/**
 * The "tags" field on an FFprobe response stream object
 */
export type FFprobeStreamTags = {
   /**
    * The comment attached to the stream
    */
   comment?: string;

   /**
    * The date (often ISO-formatted, but it may use other formats) when the media was created
    */
   creation_time?: string;

   /**
    * The name of the encoder responsible for creating the stream
    */
   encoder?: string;

   /**
    * The name of the handler which produced the track
    */
   handler_name?: string;

   /**
    * The ID of the vendor which produced the track
    */
   vendor_id?: string;

   /**
    * Raw language tag stored directly in stream metadata.
    * Often identical to the normalized "language" property.
    * (usually represented using a 3 letter language code, e.g.: "eng")
    */
   language?: string;

   /**
    * Uppercase variant of the language tag used by some older
    * tagging tools or scripts. Usually contains ISO codes.
    */
   LANGUAGE?: string;

   /**
    * Generic alternative language tag used by non-standard tools.
    * May hold ISO codes or plain text.
    */
   lang?: string;

   /**
    * Uppercase variant of the generic "lang" tag.
    */
   LANG?: string;

   /**
    * iTunes/M4B language atom extracted from MP4 metadata.
    * Common in professionally created audiobooks (e.g. Audible, iTunes).
    */
   "©lan"?: string;
};

/**
 * A successful FFprobe probe result object
 */
export type FFprobeSuccessResult = {
   /**
    * The probed file's chapters (-show_chapters flag required)
    */
   chapters: FFprobeChapter[];

   /**
    * The probed file's format data (-show_format flag required)
    */
   format: FFprobeFormat;

   /**
    * The probed file's streams (-show_streams flag required)
    */
   streams: FFprobeStream[];
};

/**
 * An FFprobe error result object
 */
export type FFprobeErrorResult = {
   /**
    * The error that occurred when trying to probe the file (-show_error flag required)
    */
   error: FFprobeProbeError;
};

/**
 * An FFprobe probe result object
 */
export type FFprobeProbeResult = FFprobeSuccessResult | FFprobeErrorResult;
