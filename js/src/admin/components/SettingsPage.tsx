import ExtensionPage from 'flarum/components/ExtensionPage';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/admin/utils/saveSettings';
import Switch from 'flarum/common/components/Switch';
import Select from 'flarum/common/components/Select';
import Stream from 'flarum/utils/Stream';

import datepicker from 'js-datepicker';
import noUiSlider from 'nouislider';

export default class SettingsPage extends ExtensionPage {
  oninit(attrs) {
    super.oninit(attrs);
    this.loading = false;
    this.modified = false;

    this.settingOptions = {
      fireworksOptionShowFireworks:app.data.settings["ziven-fireworks.fireworksOptionShowFireworks"]!=='1'?false:true,
      fireworksOptionFlickering: app.data.settings['ziven-fireworks.fireworksOptionFlickering'] || 50,
      fireworksOptionOpacity: app.data.settings['ziven-fireworks.fireworksOptionOpacity'] || 0.5,
      fireworksOptionAcceleration: app.data.settings['ziven-fireworks.fireworksOptionAcceleration'] || 1.05,
      fireworksOptionFriction: app.data.settings['ziven-fireworks.fireworksOptionFriction'] || 0.97,
      fireworksOptionGravity: app.data.settings['ziven-fireworks.fireworksOptionGravity'] || 1.5,
      fireworksOptionParticles: app.data.settings['ziven-fireworks.fireworksOptionParticles'] || 60,
      fireworksOptionTraceLength: app.data.settings['ziven-fireworks.fireworksOptionTraceLength'] || 3,
      fireworksOptionTraceSpeed: app.data.settings['ziven-fireworks.fireworksOptionTraceSpeed'] || 10,
      fireworksOptionExplosion: app.data.settings['ziven-fireworks.fireworksOptionExplosion'] || 5,
      fireworksOptionIntensity: app.data.settings['ziven-fireworks.fireworksOptionIntensity'] || 5,
      fireworksOptionHueMin: app.data.settings['ziven-fireworks.fireworksOptionHueMin'] || 0,
      fireworksOptionHueMax: app.data.settings['ziven-fireworks.fireworksOptionHueMax'] || 345,
      fireworksOptionOptionLineWidthTraceMin: app.data.settings['ziven-fireworks.fireworksOptionOptionLineWidthTraceMin'] || 0.1,
      fireworksOptionOptionLineWidthTraceMax: app.data.settings['ziven-fireworks.fireworksOptionOptionLineWidthTraceMax'] || 1,
      fireworksOptionOptionLineWidthExplosionMin: app.data.settings['ziven-fireworks.fireworksOptionOptionLineWidthExplosionMin'] || 1,
      fireworksOptionOptionLineWidthExplosionMax: app.data.settings['ziven-fireworks.fireworksOptionOptionLineWidthExplosionMax'] || 4,
      fireworksOptionOptionBrightnessMin: app.data.settings['ziven-fireworks.fireworksOptionOptionBrightnessMin'] || 50,
      fireworksOptionOptionBrightnessMax: app.data.settings['ziven-fireworks.fireworksOptionOptionBrightnessMax'] || 80,
      fireworksOptionOptionDecayMin: app.data.settings['ziven-fireworks.fireworksOptionOptionDecayMin'] || 0.0150,
      fireworksOptionOptionDecayMax: app.data.settings['ziven-fireworks.fireworksOptionOptionDecayMax'] || 0.0300,
      fireworksOptionOptionDelayMin: app.data.settings['ziven-fireworks.fireworksOptionOptionDelayMin'] || 30,
      fireworksOptionOptionDelayMax: app.data.settings['ziven-fireworks.fireworksOptionOptionDelayMax'] || 60,
      fireworksOptionOptionRocketsPointMin: app.data.settings['ziven-fireworks.fireworksOptionOptionRocketsPointMin'] || 50,
      fireworksOptionOptionRocketsPointMax: app.data.settings['ziven-fireworks.fireworksOptionOptionRocketsPointMax'] || 50,
      fireworksOptionLineStyle: Stream(app.data.settings['ziven-fireworks.fireworksOptionLineStyle'] || "round"),
    };
  }

  oncreate(){
    // const picker = datepicker("#fireworksDatePicker");
    const sliderHue = document.getElementById('sliderHue');
    const sliderLineWidthExplosion = document.getElementById('sliderLineWidthExplosion');
    const sliderLineWidthTrace = document.getElementById('sliderLineWidthTrace');
    const sliderBrightness = document.getElementById('sliderBrightness');
    const sliderDecay = document.getElementById('sliderDecay');
    const sliderDelay = document.getElementById('sliderDelay');
    const sliderRocketsPoint = document.getElementById('sliderRocketsPoint');
    const _this = this;
    const sliderOptions = [
      {element:sliderHue,attrMin:"fireworksOptionHueMin",attrMax:"fireworksOptionHueMax",step:1,range:{min:0,max:360}},
      {element:sliderLineWidthExplosion,attrMin:"fireworksOptionOptionLineWidthExplosionMin",attrMax:"fireworksOptionOptionLineWidthExplosionMax",step:0.01,range:{min:0,max:10}},
      {element:sliderLineWidthTrace,attrMin:"fireworksOptionOptionLineWidthTraceMin",attrMax:"fireworksOptionOptionLineWidthTraceMax",step:0.01,range:{min:0,max:10}},
      {element:sliderBrightness,attrMin:"fireworksOptionOptionBrightnessMin",attrMax:"fireworksOptionOptionBrightnessMax",step:1,range:{min:1,max:100}},
      {element:sliderDecay,attrMin:"fireworksOptionOptionDecayMin",attrMax:"fireworksOptionOptionDecayMax",step:0.001,range:{min:0.001,max:0.05}},
      {element:sliderDelay,attrMin:"fireworksOptionOptionDelayMin",attrMax:"fireworksOptionOptionDelayMax",step:0.01,range:{min:10,max:100}},
      {element:sliderRocketsPoint,attrMin:"fireworksOptionOptionRocketsPointMin",attrMax:"fireworksOptionOptionRocketsPointMax",step:1,range:{min:0,max:100}},
    ];

    for(let index in sliderOptions){
      let sliderOptionData = sliderOptions[index];

      noUiSlider.create(sliderOptionData.element, {
          start: [_this.settingOptions[sliderOptionData.attrMin],_this.settingOptions[sliderOptionData.attrMax]],
          connect: true,
          tooltips: true,
          step: sliderOptionData.step,
          range: sliderOptionData.range
      });

      (sliderOptionData.element).noUiSlider.on("update", function(values){
        if(values[0]!==_this.settingOptions[sliderOptionData.attrMin] || values[1]!==_this.settingOptions[sliderOptionData.attrMax]){
          _this.settingOptions[sliderOptionData.attrMin] = values[0];
          _this.settingOptions[sliderOptionData.attrMax] = values[1];
          _this.modified = true;
          m.redraw();
        }
      });
    }

  }

  changeOption(key,e){
    this.modified = true;
    this.settingOptions[key] = (e.currentTarget as HTMLInputElement).value;
  }

  content() {

    return (
      <div className="ExtensionPage-settings FlarumBadgesPage">
        <div className="container">
          <fieldset class="Form-group">
            {Switch.component({
              state: this.settingOptions.fireworksOptionShowFireworks,
              onchange: value => {
                this.modified = true;
                this.settingOptions.fireworksOptionShowFireworks = value;
              }
            }, app.translator.trans("ziven-fireworks.admin.show-fireworks"))}
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-hue')}</label>
            <div className="fireworksSliderContainier">
              <div id="sliderHue" className="fireworksSlider"></div>
            </div>
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-acceleration')}</label>
            <input type="number" min="1" max="2" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionAcceleration} placeholder="1.05" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionAcceleration",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-brightness')}</label>
            <div className="fireworksSliderContainier">
              <div id="sliderBrightness" className="fireworksSlider"></div>
            </div>
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-decay')}</label>
            <div className="fireworksSliderContainier">
              <div id="sliderDecay" className="fireworksSlider"></div>
            </div>
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-delay')}</label>
            <div className="fireworksSliderContainier">
              <div id="sliderDelay" className="fireworksSlider"></div>
            </div>
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-explosion')}</label>
            <input type="number" min="1" max="2" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionExplosion} placeholder="1.05" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionExplosion",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-flickering')}</label>
            <input type="number" min="0" max="100" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionFlickering} placeholder="50" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionFlickering",e);
            }} />
          </fieldset>
          
          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-intensity')}</label>
            <input type="number" min="1" max="60" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionIntensity} placeholder="5" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionIntensity",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-frication')}</label>
            <input type="number" min="0.5" max="3" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionFriction} placeholder="0.97" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionFriction",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-gravity')}</label>
            <input type="number" min="0" max="10" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionGravity} placeholder="1.5" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionGravity",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-opacity')}</label>
            <input type="number" min="0" max="1" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionOpacity} placeholder="0.5" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionOpacity",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-particles')}</label>
            <input type="number" min="1" max="200" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionParticles} placeholder="60" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionParticles",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-trace-length')}</label>
            <input type="number" min="1" max="10" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionTraceLength} placeholder="3" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionTraceLength",e);
            }} />
          </fieldset>
          
          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-trace-speed')}</label>
            <input type="number" min="1" max="100" disabled={this.loading} className="FormControl" value={this.settingOptions.fireworksOptionTraceSpeed} placeholder="10" oninput={(e: InputEvent) => {
              this.changeOption("fireworksOptionTraceSpeed",e);
            }} />
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-rockets-point')}</label>
            <div className="fireworksSliderContainier">
              <div id="sliderRocketsPoint" className="fireworksSlider"></div>
            </div>
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-line-width-explosion')}</label>
            <div className="fireworksSliderContainier">
              <div id="sliderLineWidthExplosion" className="fireworksSlider"></div>
            </div>
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-line-width-trace')}</label>
            <div className="fireworksSliderContainier">
              <div id="sliderLineWidthTrace" className="fireworksSlider"></div>
            </div>
          </fieldset>

          <fieldset className="Form-group">
            <label>{app.translator.trans('ziven-fireworks.admin.option-lineStyle')}</label>
            
            <Select
              value={this.settingOptions.fireworksOptionLineStyle()}
              options={{
                'round': app.translator.trans('ziven-fireworks.admin.option-lineStyle-round'),
                'square': app.translator.trans('ziven-fireworks.admin.option-lineStyle-square'),
              }}
              buttonClassName="Button"
              onchange={(value) => {
                this.settingOptions.fireworksOptionLineStyle(value);
                this.modified = true;
              }}
            />
          </fieldset>

          <Button
            onclick={this.customSaveSettings.bind(this)}
            className="Button Button--primary"
            disabled={!this.modified}
            loading={this.loading}
          >
            {app.translator.trans('ziven-foldable-banner.admin.save')}
          </Button>
        </div>
      </div>
    );
  }

  async customSaveSettings(e: SubmitEvent) {
    e.preventDefault();

    app.alerts.clear();
    this.loading = true;

    let optionsData = {};

    for(let option in this.settingOptions){
      let value = this.settingOptions[option];
      optionsData["ziven-fireworks."+option] = typeof(value)==="function"?value():value;
    }

    await saveSettings(optionsData);

    this.onSettingsSaved();
    return true;
  }

  onSettingsSaved(): void {
    this.loading = false;
    this.modified = false;

    app.alerts.show({ type: 'success' }, app.translator.trans('core.admin.settings.saved_message'));
  }

}
