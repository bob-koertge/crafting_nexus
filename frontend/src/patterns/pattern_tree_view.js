import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

const drawerWidth = 240;

function PatternTreeView(props) {
  const [token, ,] = useCookies(["craftingnexus"]);
  const sizes = props.sizes;
  const categories = props.categories;
  const patterns = props.patterns;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token["craftingnexus"]) navigate("/auth");
  }, [token, navigate]);

  const patternsInCategory = (category) => {
    return patterns
      .map((item) => ({
        ...item,
        pattern_categories: item.pattern_categories.filter(
          (pattern_categories) => pattern_categories.id === category
        ),
      }))
      .filter((item) => item.pattern_categories.length > 0);
  };

  const patternsUncategorized = () => {
    return patterns
      .map((item) => ({ ...item }))
      .filter((item) => item.pattern_categories.length === 0);
  };

  const patternsInSizes = (size) => {
    return patterns
      .map((item) => ({
        ...item,
        pattern_sizes: item.pattern_sizes.filter(
          (pattern_sizes) => pattern_sizes.id === size
        ),
      }))
      .filter((item) => item.pattern_sizes.length > 0);
  };

  const patternsSizeUnknown = () => {
    return patterns
      .map((item) => ({ ...item }))
      .filter((item) => item.pattern_sizes.length === 0);
  };

  return (
    <React.Fragment>
      <TreeView
        aria-label="Patterns by..."
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, maxWidth: drawerWidth, overflowY: "auto" }}
      >
        <TreeItem nodeId="patternsbycat" label="Patterns By Category">
          {categories.map((category) => (
            <TreeItem
              nodeId={category.id ? String(category.id) : "defaultNodeId"}
              key={category.id}
              label={category.name}
            >
              {patternsInCategory(category.id).map((pattern) => (
                <TreeItem
                  nodeId={"pattern" + pattern.id + category.id}
                  key={"pattern" + pattern.id + category.id}
                  label={pattern.name}
                  onClick={() => props.clickedPattern(pattern)}
                />
              ))}
            </TreeItem>
          ))}
          <TreeItem nodeId="uncat" key="uncat" label="Uncategorized">
            {patternsUncategorized().map((pattern) => (
              <TreeItem
                nodeId={"pattern" + pattern.id}
                key={"pattern" + pattern.id}
                label={pattern.name}
                onClick={() => props.clickedPattern(pattern)}
              />
            ))}
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="patbysize" label="Patterns By Sizes">
          {sizes.map((size) => (
            <TreeItem
              nodeId={size.id ? String(size.id) : "defaultNodeId"}
              key={size.id}
              label={size.size_name}
            >
              {patternsInSizes(size.id).map((pattern) => (
                <TreeItem
                  nodeId={"patternsize" + pattern.id + size.id}
                  key={"patternsize" + pattern.id + size.id}
                  label={pattern.name}
                  onClick={() => props.clickedPattern(pattern)}
                />
              ))}
            </TreeItem>
          ))}
          <TreeItem nodeId="unknown" label="Unknown">
            {patternsSizeUnknown().map((pattern) => (
              <TreeItem
                nodeId={"pattern" + pattern.id}
                key={"pattern" + pattern.id}
                label={pattern.name}
                onClick={() => props.clickedPattern(pattern)}
              />
            ))}
          </TreeItem>
        </TreeItem>
      </TreeView>
    </React.Fragment>
  );
}

export default PatternTreeView;
