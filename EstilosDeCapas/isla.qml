<!DOCTYPE qgis PUBLIC 'http://mrcc.com/qgis.dtd' 'SYSTEM'>
<qgis version="3.4.10-Madeira" labelsEnabled="1" styleCategories="Symbology|Labeling">
  <renderer-v2 type="RuleRenderer" symbollevels="0" forceraster="0" enableorderby="0">
    <rules key="{6bec919a-9351-47db-831e-837ca9d30482}">
      <rule key="{2300d19b-3a2b-4879-ab77-d7d5406769cc}" symbol="0" filter="&quot;tipo&quot; = 'Fluvial'" label="Fluvial"/>
      <rule key="{f24a7a6d-c95b-4b41-8cb3-d4bcb471d47a}" symbol="1" filter="&quot;tipo&quot; = 'Lacustre'" label="Lacustre"/>
    </rules>
    <symbols>
      <symbol type="fill" name="0" force_rhr="0" clip_to_extent="1" alpha="1">
        <layer enabled="1" pass="0" locked="0" class="SimpleFill">
          <prop k="border_width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="color" v="232,174,25,255"/>
          <prop k="joinstyle" v="bevel"/>
          <prop k="offset" v="0,0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="outline_color" v="35,35,35,255"/>
          <prop k="outline_style" v="solid"/>
          <prop k="outline_width" v="0.26"/>
          <prop k="outline_width_unit" v="MM"/>
          <prop k="style" v="solid"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" name="name" value=""/>
              <Option name="properties"/>
              <Option type="QString" name="type" value="collection"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
      <symbol type="fill" name="1" force_rhr="0" clip_to_extent="1" alpha="1">
        <layer enabled="1" pass="0" locked="0" class="SimpleFill">
          <prop k="border_width_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="color" v="231,81,126,255"/>
          <prop k="joinstyle" v="bevel"/>
          <prop k="offset" v="0,0"/>
          <prop k="offset_map_unit_scale" v="3x:0,0,0,0,0,0"/>
          <prop k="offset_unit" v="MM"/>
          <prop k="outline_color" v="35,35,35,255"/>
          <prop k="outline_style" v="solid"/>
          <prop k="outline_width" v="0.26"/>
          <prop k="outline_width_unit" v="MM"/>
          <prop k="style" v="solid"/>
          <data_defined_properties>
            <Option type="Map">
              <Option type="QString" name="name" value=""/>
              <Option name="properties"/>
              <Option type="QString" name="type" value="collection"/>
            </Option>
          </data_defined_properties>
        </layer>
      </symbol>
    </symbols>
  </renderer-v2>
  <labeling type="rule-based">
    <rules key="{8c76c20f-ac97-4fa4-b0bf-730b99b73c05}">
      <rule description="Nombre" key="{cc417c43-5e9f-4a35-b794-6db850a99f20}" scalemaxdenom="100000" scalemindenom="1000">
        <settings>
          <text-style fontSizeUnit="Point" previewBkgrdColor="#ffffff" fontSize="10" isExpression="0" fontWeight="50" useSubstitutions="0" fontCapitals="0" textOpacity="1" multilineHeight="1" fontSizeMapUnitScale="3x:0,0,0,0,0,0" fontItalic="0" fontFamily="Sans Serif" textColor="0,0,0,255" namedStyle="Normal" fontStrikeout="0" blendMode="0" fontUnderline="0" fontLetterSpacing="0" fieldName="nombre" fontWordSpacing="0">
            <text-buffer bufferSize="1" bufferSizeUnits="MM" bufferNoFill="1" bufferSizeMapUnitScale="3x:0,0,0,0,0,0" bufferJoinStyle="128" bufferDraw="0" bufferOpacity="1" bufferBlendMode="0" bufferColor="255,255,255,255"/>
            <background shapeRadiiMapUnitScale="3x:0,0,0,0,0,0" shapeSizeUnit="MM" shapeType="0" shapeOffsetMapUnitScale="3x:0,0,0,0,0,0" shapeOffsetUnit="MM" shapeDraw="0" shapeRadiiX="0" shapeBorderWidthMapUnitScale="3x:0,0,0,0,0,0" shapeOpacity="1" shapeSizeMapUnitScale="3x:0,0,0,0,0,0" shapeSizeY="0" shapeJoinStyle="64" shapeBorderWidthUnit="MM" shapeRadiiUnit="MM" shapeRotation="0" shapeBorderWidth="0" shapeRadiiY="0" shapeOffsetY="0" shapeBorderColor="128,128,128,255" shapeSizeX="0" shapeSVGFile="" shapeOffsetX="0" shapeRotationType="0" shapeBlendMode="0" shapeSizeType="0" shapeFillColor="255,255,255,255"/>
            <shadow shadowRadiusAlphaOnly="0" shadowDraw="0" shadowOffsetMapUnitScale="3x:0,0,0,0,0,0" shadowScale="100" shadowRadiusMapUnitScale="3x:0,0,0,0,0,0" shadowColor="0,0,0,255" shadowBlendMode="6" shadowOffsetAngle="135" shadowOffsetUnit="MM" shadowRadiusUnit="MM" shadowOpacity="0.7" shadowUnder="0" shadowOffsetGlobal="1" shadowRadius="1.5" shadowOffsetDist="1"/>
            <substitutions/>
          </text-style>
          <text-format decimals="3" autoWrapLength="0" wrapChar="" plussign="0" reverseDirectionSymbol="0" placeDirectionSymbol="0" formatNumbers="0" multilineAlign="4294967295" leftDirectionSymbol="&lt;" addDirectionSymbol="0" useMaxLineLengthForAutoWrap="1" rightDirectionSymbol=">"/>
          <placement maxCurvedCharAngleIn="25" priority="5" distMapUnitScale="3x:0,0,0,0,0,0" placement="0" offsetType="0" dist="0" repeatDistance="0" repeatDistanceMapUnitScale="3x:0,0,0,0,0,0" preserveRotation="1" repeatDistanceUnits="MM" offsetUnits="MM" quadOffset="4" distUnits="MM" centroidWhole="0" maxCurvedCharAngleOut="-25" yOffset="0" xOffset="0" centroidInside="0" placementFlags="10" rotationAngle="0" predefinedPositionOrder="TR,TL,BR,BL,R,L,TSR,BSR" labelOffsetMapUnitScale="3x:0,0,0,0,0,0" fitInPolygonOnly="0"/>
          <rendering obstacleType="0" obstacleFactor="1" mergeLines="0" drawLabels="1" minFeatureSize="0" scaleVisibility="0" maxNumLabels="2000" displayAll="0" zIndex="0" fontMaxPixelSize="10000" fontLimitPixelSize="0" upsidedownLabels="0" scaleMin="0" fontMinPixelSize="3" scaleMax="0" obstacle="1" labelPerPart="0" limitNumLabels="0"/>
          <dd_properties>
            <Option type="Map">
              <Option type="QString" name="name" value=""/>
              <Option name="properties"/>
              <Option type="QString" name="type" value="collection"/>
            </Option>
          </dd_properties>
        </settings>
      </rule>
    </rules>
  </labeling>
  <blendMode>0</blendMode>
  <featureBlendMode>0</featureBlendMode>
  <layerGeometryType>2</layerGeometryType>
</qgis>
