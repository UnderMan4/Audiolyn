use lofty::properties::FileProperties;
use crate::metadata::types::AudiobookInfoBuilder;

pub fn fill_properties(builder: &mut AudiobookInfoBuilder, props: &FileProperties) {
    builder
        .duration(props.duration().as_millis())
        .bitrate(props.audio_bitrate())
        .sample_rate(props.sample_rate())
        .channels(props.channels())
        .bit_depth(props.bit_depth());
}