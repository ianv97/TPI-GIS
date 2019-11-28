<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis labelsEnabled="1" simplifyDrawingHints="1" simplifyDrawingTol="1" hasScaleBasedVisibilityFlag="0" simplifyLocal="1" minScale="0" readOnly="0" styleCategories="LayerConfiguration|Symbology|Labeling|Rendering" version="3.8.2-Zanzibar" simplifyMaxScale="1" maxScale="0" simplifyAlgorithm="0">
  <flags>
    <Identifiable>1</Identifiable>
    <Removable>1</Removable>
    <Searchable>1</Searchable>
  </flags>
  <renderer-v2 type="RuleRenderer" forceraster="0" symbollevels="0" enableorderby="0">
    <rules key="{93334a6e-eeaa-4287-a2dd-bc6040e262c3}">
      <rule filter="&quot;tipo&quot; = 'Acequia o Zanja'" scalemindenom="1000" label="Acequia o Zanja" key="{6029412f-11a9-4979-aa37-d00975a1c4ba}" scalemaxdenom="1000000" symbol="0"/>
      <rule filter="&quot;tipo&quot; = 'Canal'" label="Canal" key="{70473222-3b6e-4323-8087-4abaec119b1a}" symbol="1"/>
      <rule filter="&quot;tipo&quot; = 'Corriente de Agua Intermitente'" scalemindenom="1000" label="Corriente de Agua Intermitente" key="{c20ebf96-658d-4b61-849c-bc00d658e236}" scalemaxdenom="1000000" symbol="2"/>
      <rule filter="&quot;tipo&quot; = 'Corriente de Agua Perenne'" label="Corriente de Agua Perenne" key="{e0d08df9-3533-4c4e-852a-5335f41bb2e0}" symbol="3"/>
      <rule filter="&quot;tipo&quot; = 'Zanjón'" scalemindenom="1000" label="Zanjón" key="{df365c26-1039-4cd8-81c0-b1e6b24970e9}" scalemaxdenom="1000000" symbol="4"/>
      <rule filter="ELSE" key="{424f9b74-6015-4c22-96ff-e3cc3c62a6d3}" symbol="5"/>
    </rules>
    <symbols>
      <symbol type="line" name="0" clip_to_extent="1" force_rhr="0" alpha="1">
        <layer enabled="1" class="SimpleLine" locked="0" pass="0">
          <prop k="capstyle" v="square"/>
          <prop k="customdash" v="5;2"/>
          <prop k="customdash_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="customdash_unit" v="MM"/>
          <prop k="draw_inside_polygon" v="0"/>
          <prop k="joinstyle" v="bevel"/>
          <prop k="line_color" v="72,123,182,255"/>
          <prop k="line_style" v="solid"/>
          <prop k="line_width" v="0.1"/>
          <prop k="line_width_unit" v="MM"/>
          <prop k="offset" v="0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="ring_filter" v="0"/>
          <prop k="use_custom_dash" v="0"/>
          <prop k="width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" value="" name="name"/>
              <Option name="properties"/>
              <Option type="QString" value="collection" name="type"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
      <symbol type="line" name="1" clip_to_extent="1" force_rhr="0" alpha="1">
        <layer enabled="1" class="SimpleLine" locked="0" pass="0">
          <prop k="capstyle" v="square"/>
          <prop k="customdash" v="5;2"/>
          <prop k="customdash_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="customdash_unit" v="MM"/>
          <prop k="draw_inside_polygon" v="0"/>
          <prop k="joinstyle" v="bevel"/>
          <prop k="line_color" v="72,123,182,255"/>
          <prop k="line_style" v="solid"/>
          <prop k="line_width" v="0.2"/>
          <prop k="line_width_unit" v="MM"/>
          <prop k="offset" v="0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="ring_filter" v="0"/>
          <prop k="use_custom_dash" v="0"/>
          <prop k="width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" value="" name="name"/>
              <Option name="properties"/>
              <Option type="QString" value="collection" name="type"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
      <symbol type="line" name="2" clip_to_extent="1" force_rhr="0" alpha="1">
        <layer enabled="1" class="SimpleLine" locked="0" pass="0">
          <prop k="capstyle" v="round"/>
          <prop k="customdash" v="0.66;2"/>
          <prop k="customdash_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="customdash_unit" v="MM"/>
          <prop k="draw_inside_polygon" v="0"/>
          <prop k="joinstyle" v="round"/>
          <prop k="line_color" v="72,123,182,255"/>
          <prop k="line_style" v="solid"/>
          <prop k="line_width" v="0.15"/>
          <prop k="line_width_unit" v="MM"/>
          <prop k="offset" v="0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="ring_filter" v="0"/>
          <prop k="use_custom_dash" v="1"/>
          <prop k="width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" value="" name="name"/>
              <Option name="properties"/>
              <Option type="QString" value="collection" name="type"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
      <symbol type="line" name="3" clip_to_extent="1" force_rhr="0" alpha="1">
        <layer enabled="1" class="SimpleLine" locked="0" pass="0">
          <prop k="capstyle" v="square"/>
          <prop k="customdash" v="5;2"/>
          <prop k="customdash_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="customdash_unit" v="MM"/>
          <prop k="draw_inside_polygon" v="0"/>
          <prop k="joinstyle" v="bevel"/>
          <prop k="line_color" v="72,123,182,255"/>
          <prop k="line_style" v="solid"/>
          <prop k="line_width" v="0.5"/>
          <prop k="line_width_unit" v="MM"/>
          <prop k="offset" v="0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="ring_filter" v="0"/>
          <prop k="use_custom_dash" v="0"/>
          <prop k="width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" value="" name="name"/>
              <Option name="properties"/>
              <Option type="QString" value="collection" name="type"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
      <symbol type="line" name="4" clip_to_extent="1" force_rhr="0" alpha="1">
        <layer enabled="1" class="SimpleLine" locked="0" pass="0">
          <prop k="capstyle" v="round"/>
          <prop k="customdash" v="0.66;2"/>
          <prop k="customdash_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="customdash_unit" v="MM"/>
          <prop k="draw_inside_polygon" v="0"/>
          <prop k="joinstyle" v="round"/>
          <prop k="line_color" v="72,123,182,255"/>
          <prop k="line_style" v="solid"/>
          <prop k="line_width" v="0.15"/>
          <prop k="line_width_unit" v="MM"/>
          <prop k="offset" v="0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="ring_filter" v="0"/>
          <prop k="use_custom_dash" v="1"/>
          <prop k="width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" value="" name="name"/>
              <Option name="properties"/>
              <Option type="QString" value="collection" name="type"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
      <symbol type="line" name="5" clip_to_extent="1" force_rhr="0" alpha="1">
        <layer enabled="1" class="SimpleLine" locked="0" pass="0">
          <prop k="capstyle" v="square"/>
          <prop k="customdash" v="5;2"/>
          <prop k="customdash_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="customdash_unit" v="MM"/>
          <prop k="draw_inside_polygon" v="0"/>
          <prop k="joinstyle" v="bevel"/>
          <prop k="line_color" v="34,129,237,255"/>
          <prop k="line_style" v="solid"/>
          <prop k="line_width" v="0.26"/>
          <prop k="line_width_unit" v="MM"/>
          <prop k="offset" v="0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="ring_filter" v="0"/>
          <prop k="use_custom_dash" v="0"/>
          <prop k="width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" value="" name="name"/>
              <Option name="properties"/>
              <Option type="QString" value="collection" name="type"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
    </symbols>
  </renderer-v2>
  <labeling type="rule-based">
    <rules key="{862ffb55-885f-4f70-a3ce-38061712e65c}">
      <rule filter="&quot;tipo&quot;='Corriente de Agua Perenne'" key="{976aff9e-f6af-43d5-8c0d-7ad85ce830ef}" active="0">
        <settings>
          <text-style fontStrikeout="0" fontLetterSpacing="0" previewBkgrdColor="#ffffff" fontWeight="50" fontUnderline="0" fontSizeUnit="Point" fontItalic="0" textOpacity="1" multilineHeight="1" fontCapitals="0" useSubstitutions="0" fontSizeMapUnitScale="3x:0,0,0,0,0,0" fieldName="nombre" isExpression="0" fontFamily="Sans Serif" blendMode="0" textColor="0,0,0,255" fontSize="10" namedStyle="Normal" fontWordSpacing="0">
            <text-buffer bufferNoFill="1" bufferBlendMode="0" bufferOpacity="1" bufferColor="255,255,255,255" bufferSize="1" bufferDraw="0" bufferSizeUnits="MM" bufferJoinStyle="128" bufferSizeMapUnitScale="3x:0,0,0,0,0,0"/>
            <background shapeRotation="0" shapeSizeType="0" shapeJoinStyle="64" shapeOffsetUnit="MM" shapeType="0" shapeOffsetX="0" shapeBorderWidthUnit="MM" shapeFillColor="255,255,255,255" shapeBorderWidthMapUnitScale="3x:0,0,0,0,0,0" shapeSizeUnit="MM" shapeRadiiX="0" shapeSizeMapUnitScale="3x:0,0,0,0,0,0" shapeRadiiUnit="MM" shapeRotationType="0" shapeOpacity="1" shapeBlendMode="0" shapeSizeX="0" shapeRadiiY="0" shapeBorderColor="128,128,128,255" shapeSVGFile="" shapeSizeY="0" shapeBorderWidth="0" shapeOffsetY="0" shapeDraw="0" shapeRadiiMapUnitScale="3x:0,0,0,0,0,0" shapeOffsetMapUnitScale="3x:0,0,0,0,0,0"/>
            <shadow shadowOffsetGlobal="1" shadowOffsetUnit="MM" shadowOffsetMapUnitScale="3x:0,0,0,0,0,0" shadowRadiusMapUnitScale="3x:0,0,0,0,0,0" shadowDraw="0" shadowOpacity="0.7" shadowColor="0,0,0,255" shadowBlendMode="6" shadowRadius="1.5" shadowUnder="0" shadowScale="100" shadowOffsetAngle="135" shadowRadiusUnit="MM" shadowRadiusAlphaOnly="0" shadowOffsetDist="1"/>
            <substitutions/>
          </text-style>
          <text-format placeDirectionSymbol="0" autoWrapLength="0" plussign="0" addDirectionSymbol="0" useMaxLineLengthForAutoWrap="1" rightDirectionSymbol=">" leftDirectionSymbol="&lt;" decimals="3" reverseDirectionSymbol="0" wrapChar="" multilineAlign="0" formatNumbers="0"/>
          <placement distMapUnitScale="3x:0,0,0,0,0,0" offsetType="0" labelOffsetMapUnitScale="3x:0,0,0,0,0,0" maxCurvedCharAngleOut="-25" geometryGeneratorType="PointGeometry" geometryGeneratorEnabled="0" centroidWhole="0" centroidInside="0" quadOffset="4" fitInPolygonOnly="0" preserveRotation="1" priority="5" distUnits="MM" repeatDistance="0" predefinedPositionOrder="TR,TL,BR,BL,R,L,TSR,BSR" geometryGenerator="" offsetUnits="MM" maxCurvedCharAngleIn="25" placementFlags="10" placement="2" xOffset="0" repeatDistanceMapUnitScale="3x:0,0,0,0,0,0" dist="0" rotationAngle="0" yOffset="0" repeatDistanceUnits="MM"/>
          <rendering scaleVisibility="0" scaleMax="0" maxNumLabels="2000" limitNumLabels="0" displayAll="0" zIndex="0" mergeLines="0" upsidedownLabels="0" obstacleFactor="1" fontMinPixelSize="3" fontLimitPixelSize="0" labelPerPart="0" obstacle="1" fontMaxPixelSize="10000" obstacleType="0" minFeatureSize="0" scaleMin="0" drawLabels="1"/>
          <dd_properties>
            <Option type="Map">
              <Option type="QString" value="" name="name"/>
              <Option name="properties"/>
              <Option type="QString" value="collection" name="type"/>
            </Option>
          </dd_properties>
        </settings>
      </rule>
    </rules>
  </labeling>
  <blendMode>0</blendMode>
  <featureBlendMode>0</featureBlendMode>
  <layerOpacity>1</layerOpacity>
  <previewExpression>nombre</previewExpression>
  <layerGeometryType>1</layerGeometryType>
</qgis>
